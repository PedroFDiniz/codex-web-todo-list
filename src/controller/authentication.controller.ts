import { StatusCode } from "../util/statuscode";
import { service } from "../service/user.service";
import { compareSync, hashSync } from "bcrypt";
import uuid from "uuid";

class AuthController {
    /**
     * Executa o login do usuário no sistema.
     */
    login = async (request:any, response:any) => {
        let result:any = { };
        let messages:string[] = [];
        let statusCode = StatusCode.INTERNAL_ERROR;

        /* Recebe informações do cliente */
        const { email, password } = request.headers;
        try {
            let user:any = await service.find(email);
            const encryptedPassword = hashSync(user.password, 11);
            /* Caso o usuário exista e a senha seja correta */
            if (user && compareSync(password, encryptedPassword)) {
                user.token = uuid.v4(); /* Cria novo token de acesso */
                user = await user.save(); /* Salva no BD */

                /* Devolverá o id e o token ao cliente */
                result.id = user._id;
                result.token = user.token;

                messages.push('Usuário autorizado.');
                statusCode = StatusCode.SUCCESS;
            } else {
                messages.push('Não autorizado.');
                statusCode = StatusCode.UNAUTHORIZED;
            }
        } catch (error) {
            messages.push("Erro no login.");
        } finally {
            return response
                .status(statusCode)
                .json({ result, messages });
        }
    }

    /**
     * Autoriza o acesso do cliente ao sistema às informações do usuário
     * se o token for válido. Tanto o id quanto o token estão no cabeçalho
     * da requisição.
     */
    authorize = async (id:string, token:string) => {
        let result:boolean = false;
        try {
            let user = await service.findById(id);
            if (user && user.token === token) result = true;
        } catch (error) { }
        finally { return result; }
    }
}

const authority = new AuthController();
export { authority };