import { userValidator } from "../validator/user.validator";
import { service } from "../service/user.service";
import { StatusCode } from "../util/statuscode";
import { authority } from "./authentication.controller";
import { Log } from "../util/log";

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
        let status = StatusCode.INTERNAL_ERROR;

        /* Corpo relevante da requisição */
        const { name, sex, age, email, password } = request.body;
        try {
            /* Validação do input */
            const { isValid, invalidFields, errors } =
                userValidator.createUser({ name, sex, age, email });

            if (isValid) {
                /* Usar UserService para executar a operação */
                result = await service.create(
                    name, age, sex, email, password
                );
                messages.push(`Usuário ${name} criado.`);
                status = StatusCode.SUCCESS;
                Log.write(`Usuário ${name} criado.`);
            } else {
                /* Caso o input não seja válido */
                result = invalidFields;
                errors.map((error:string) => messages.push(error));
                status = StatusCode.INVALID_FIELDS;
                Log.write(`Campos inválidos: ${invalidFields}`);
            }
        } catch (error:any) {
            /* Caso haja algum erro desconhecido */
            result.error = error.name;
            messages.push(error.message);
            Log.write(`Error: ${error.name}`);
        } finally {
            /* Devolve o resultado da execução */
            return response
                .status(status)
                .json({ result, messages });
        }
    }

    /**
     * Retorna todas as informações do perfil do usuário. Requer login.
     */
    findUser = async (request:any, response:any) => {
        let result:any = { };
        let messages:string[] = [];
        let status = StatusCode.INTERNAL_ERROR;

        const { id, token } = request.headers;
        const { userId, name, email } = request.body;
        /* Os três campos são opcionais, mas o cabeçalho não é */
        try {
            const authorized = await authority.authorize(id, token);
            if (authorized) {
                result = await service.findUser(
                    userId, name, email
                );
                if (!result) {
                    messages.push(`Usuário não encontrado.`);
                    Log.write(`Usuário não encontrado.`);
                } else {
                    messages.push(`Usuário ${result.name} encontrado.`);
                    Log.write(`Encontrado usuário ${result.name}`);
                }
                status = StatusCode.SUCCESS;
            } else {
                /* Caso a autorização do usuário tenha sido negada */
                result.authorized = authorized;
                status = StatusCode.UNAUTHORIZED;
                Log.write(`Acesso negado ao id:${id} e token:${token}.`);
            }
        } catch (error:any) {
            /* Caso haja algum erro desconhecido */
            result.error = error.name;
            messages.push(error.message);
            Log.write(`Error: ${error.name}`);
        } finally {
            /* Devolve o resultado da requisição */
            return response
                .status(status)
                .json({ result, messages });
        }
    }

    /**
     * Altera informações cadastrais do usuário. Requer login.
     */
    editUser = async (request:any, response:any) => {
        let status = StatusCode.INTERNAL_ERROR;
        let result:any = { };
        let messages:string[] = [];

        const { token } = request.headers;
        const { id } = request.params;
        const { name, age, picture } = request.body;
        /* Corpo relevante da requisição */
        try {
            const authorized = await authority.authorize(id, token);
            if (authorized) {
                /* Validação do input */
                const { isValid, invalidFields, errors } =
                    userValidator.editUser({ name, age, picture });

                if (isValid) {
                    result = await service.edit(
                        id, name, age, picture
                    );
                    messages.push(`Usuário ${name} editado.`);
                    status = StatusCode.SUCCESS;
                    Log.write(`Usuário ${name} editado.`);
                } else {
                    /* Caso algum dos campos não esteja no formato correto */
                    result = invalidFields;
                    errors.map((error:string) => messages.push(error));
                    status = StatusCode.INVALID_FIELDS;
                    Log.write(`Campos inválidos: ${invalidFields}`);
                }
            } else {
                /* Caso a autorização do usuário tenha sido negada */
                result.authorized = authorized;
                status = StatusCode.UNAUTHORIZED;
                Log.write(`Acesso negado ao id:${id} e token:${token}.`);
            }
        } catch (error:any) {
            /* Caso haja algum erro desconhecido */
            result.error = error.name;
            messages.push(error.message);
            Log.write(`Erro: ${error.name}`);
        } finally {
            /* Devolve o resultado da requisição */
            return response
                .status(status)
                .json({ result, messages });
        }
    }

    getUser = async (request:any, response:any) => {
        let result:any = { };
        let messages:string[] = [];
        let status = StatusCode.INTERNAL_ERROR;

        const { id } = request.params;
        const { token } = request.headers;
        try {
            const authorized = await authority.authorize(id, token);
            if (authorized) {
                const user = await service.get(id);
                if (!user) {
                    const msg = `Usuário não encontrado!`;
                    messages.push(msg);
                    Log.write(msg);
                    status = StatusCode.INVALID_FIELDS;
                } else {
                    result = user;
                    const msg = `Usuário ${user.name} resgatado com sucesso.`;
                    messages.push(msg);
                    Log.write(msg);
                    status = StatusCode.SUCCESS;
                }
            } else {
                /* Caso a autorização do usuário tenha sido negada */
                result.authorized = authorized;
                status = StatusCode.UNAUTHORIZED;
                Log.write(`Acesso negado ao id:${id} e token:${token}.`);
            }
        } catch (error:any) {
            /* Caso haja algum erro desconhecido */
            result.error = error.name;
            messages.push(error.message);
            Log.write(`Erro: ${error.name}`);
        } finally {
            /* Devolve o resultado da requisição */
            return response
                .status(status)
                .json({ result, messages });
        }
    }

    /**
     * Retorna todas as tarefas do usuário. Requer login.
     */
    getTasks = async (request:any, response:any) => {
        let result:any = { };
        let messages:string[] = [];
        let status = StatusCode.INTERNAL_ERROR;

        const { id } = request.params;
        const { token } = request.headers;
        try {
            const authorized = await authority.authorize(id, token);
            if (authorized) {
                result = await service.getTasks(id);
                if (!result) {
                    const msg = `Falha ao resgatar tarefas.`
                    messages.push(msg);
                    Log.write(msg);
                    status = StatusCode.INVALID_FIELDS;
                } else {
                    const msg = `Tarefas resgatadas.`;
                    messages.push(msg);
                    Log.write(msg);
                    status = StatusCode.SUCCESS;
                }
            } else {
                /* Caso a autorização do usuário tenha sido negada */
                result.authorized = authorized;
                status = StatusCode.UNAUTHORIZED;
                Log.write(`Acesso negado ao id:${id} e token:${token}.`);
            }
        } catch (error:any) {
            /* Caso haja algum erro desconhecido */
            result.error = error.name;
            messages.push(error.message);
            Log.write(`Erro: ${error.name}`);
        } finally {
            /* Devolve o resultado da requisição */
            return response
                .status(status)
                .json({ result, messages });
        }
    }

    findAll = async (request:any, response:any) => {
        let messages:string[] = [];
        const result = await service.findAll();
        return response
            .status(200)
            .json({ result, messages });
    }
}

const userController = new UserController();
export { userController };