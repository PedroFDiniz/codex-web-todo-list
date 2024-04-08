import { UserService } from "../service/user.service";
import { userValidator } from "../validators/user.validator";
import { StatusCode } from "../util/statuscode";

/**
 * Faz a ligação das rotas com as funções do serviço
 */
class UserController {
    /**
     * Cadastra um novo usuário. Não requer login.
     */
    createUser(request:any, response:any) {
        let result = {};
        let messages = [];
        let statusCode = StatusCode.INTERNAL_ERROR;

        const { name, sex, age, email, password } = request.body;
        try {
            const { isValid, invalidFields, errors } =
                userValidator.createUser({ name, sex, age, email });

            if (isValid) {
                /* Usar Service para criar um usuário no BD */
                // result = ;
                messages.push("Usuário criado.");
                statusCode = StatusCode.SUCCESS;
            } else {
                result = invalidFields;
                errors.map((error:string) => messages.push(error));
                statusCode = StatusCode.INVALID_FIELDS;
            }

            return response
                .status(statusCode)
                .json({ result, messages });
        } catch (exception:any) {
            return response
                .status(statusCode)
                .json({ result: exception.errors, messages });
        }
    }

    /**
     * Retorna todas as informações do perfil do usuário. Requer login.
     */
    getUser(request:any, response:any) {
        let statusCode = StatusCode.INTERNAL_ERROR;
        const { id, token } = request.headers;

    }

    /**
     * Altera informações cadastrais do usuário. Requer login.
     */
    editUser(request:any, response:any) {
        let statusCode = StatusCode.INTERNAL_ERROR;
        const { id, token } = request.headers;
        const { name, age, picture } = request.body;

    }

    /**
     * Retorna todas as tarefas do usuário. Requer login.
     */
    getTasks(request:any, response:any) {
        let statusCode = StatusCode.INTERNAL_ERROR;
        const { id, token } = request.headers;

    }
}

const userController = new UserController();
export { userController };