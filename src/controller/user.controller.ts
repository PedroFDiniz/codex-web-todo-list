import { userValidator } from "../validators/user.validator";
import { service } from "../service/user.service";
import { StatusCode } from "../util/statuscode";
import { authority } from "./authentication.controller";
import { hashSync } from "bcrypt";

/**
 * Faz a ligação das rotas com as funções do serviço
 */
class UserController {
    /**
     * Cadastra um novo usuário. Não requer login.
     */
    createUser = async (request:any, response:any) => {
        let result:any = { };
        let messages:string[] = [];
        let statusCode = StatusCode.INTERNAL_ERROR;

        /* Corpo relevante da requisição */
        const { name, sex, age, email, password } = request.body;
        try {
            /* Validação do input */
            const { isValid, invalidFields, errors } =
                userValidator.createUser({ name, sex, age, email });

            if (isValid) {
                /* Usar UserService para criar um usuário no BD */
                result = await service.create(
                    name, age, sex, email, password
                );
                messages.push(`Usuário ${name} criado.`);
                statusCode = StatusCode.SUCCESS;
            } else { /* Caso o input não seja válido */
                result = invalidFields;
                errors.map((error:string) => messages.push(error));
                statusCode = StatusCode.INVALID_FIELDS;
            }

            /* Retorna o novo usuário ou os campos inválidos */
            return response
                .status(statusCode)
                .json({ result, messages });
        } catch (exception:any) {
            /* Caso haja algum erro desconhecido */
            return response
                .status(statusCode)
                .json({ result: exception.errors, messages });
        }
    }

    /**
     * Retorna todas as informações do perfil do usuário. Requer login.
     */
    getUser = async (request:any, response:any) => {
        let statusCode = StatusCode.INTERNAL_ERROR;
        const { id, token } = request.headers;
    }

    /**
     * Altera informações cadastrais do usuário. Requer login.
     */
    editUser = async (request:any, response:any) => {
        let statusCode = StatusCode.INTERNAL_ERROR;
        const { id, token } = request.headers;
        const { name, age, picture } = request.body;

    }

    /**
     * Retorna todas as tarefas do usuário. Requer login.
     */
    getTasks = async (request:any, response:any) => {
        let statusCode = StatusCode.INTERNAL_ERROR;
        const { id, token } = request.headers;

    }

    findAll = async (request:any, response:any) => {
        response.status(200).json(service.findAll());
    }
}

const userController = new UserController();
export { userController };