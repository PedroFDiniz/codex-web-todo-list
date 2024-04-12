import { StatusCode } from "../util/statuscode";
import { service } from "../service/user.service";
import { compareSync, hashSync } from "bcrypt";
import { v4 } from "uuid";
import { Log } from "../util/log";

class AuthController {
    /**
     * Executa o login do usuário no sistema.
     * Deve receber um email e uma senha no cabeçalho da requisição.
     */
    login = async (request:any, response:any) => {
        let result:any = { };
        let messages:string[] = [];
        let statusCode = StatusCode.INTERNAL_ERROR;

        /* Recebe informações do cliente */
        const { email, password } = request.headers;
        try {
            let user:any = await service.fetchLogin(email);
            /* Caso o usuário exista e a senha seja correta */
            if (user && (password === user.password)) {
                user.token = v4(); /* Cria novo token de acesso */
                user = await user.save(); /* Salva no BD */

                /* Devolverá o id e o token ao cliente */
                result.id = user._id;
                result.token = user.token;

                messages.push('Usuário autorizado.');
                statusCode = StatusCode.SUCCESS;
            } else {
                Log.write("Error: empty user or wrong password.");
                messages.push('Não autorizado.');
                statusCode = StatusCode.UNAUTHORIZED;
            }
        } catch (error) {
            Log.write(String(error));
            messages.push("Erro no login.");
        } finally {
            return response
                .status(statusCode)
                .json({ result, messages });
        }
    }

    /**
     * Autoriza o acesso do cliente ao sistema com as informações do usuário se
     * o token for válido. Tanto o id quanto o token devem vir no cabeçalho da
     * requisição.
     */
    authorize = async (id:string, token:string) => {
        let result:boolean = false;
        try {
            let user = await service.findById(id);
            if (user && user.token === token) result = true;
        } catch (error:any) { Log.write(error.toString()) }
        finally { return result; }
    }
}

const authority = new AuthController();
export { authority };