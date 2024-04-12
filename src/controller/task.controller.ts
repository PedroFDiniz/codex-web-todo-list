import { StatusCode } from "../util/statuscode";
import { service } from "../service/task.service";
import { service as userService } from "../service/user.service";
import { Log } from "../util/log";
import { taskValidator } from "../validator/task.validator";
import { authority } from "./authentication.controller";

class TaskController {
    /**
     * Cria novas tarefas para um usuário. Requer login.
     */
    async scheduleTask(request:any, response:any) {
        let result:any = { };
        let messages:string[] = [];
        let status = StatusCode.INTERNAL_ERROR;

        const { token } = request.headers;
        const { id } = request.params
        const { name, date, description } = request.body;
        try {
            const authorized = await authority.authorize(id, token);
            if (authorized) {
                /* Validação do input */
                const { isValid, invalidFields, errors } =
                    taskValidator.scheduleTask({ name, date });

                if (isValid) {
                    /* Usar TaskService para executar a operação */
                    result = await service.create(name, date, description);
                    const msg = `Tarefa ${!name? "" : name + " "}criada.`
                    messages.push(msg);
                    Log.write(msg);
                    const user = await userService.addTask(id, result["_id"]);
                    if (!user) {
                        const msg2 =
                            "Não foi possível adicionar a tarefa " +
                            `à lista do usuário`;
                        messages.push(msg2);
                        Log.write(msg2);
                    } else {
                        const msg2 =
                            `Mensagem adicionada à lista do usuário ${user.name} ` +
                            "com sucesso.";
                        messages.push(msg2);
                        Log.write(msg2);
                    }
                    status = StatusCode.SUCCESS;
                } else {
                    /* Caso o input não seja válido */
                    result = invalidFields;
                    errors.map((error:string) => messages.push(error));
                    status = StatusCode.INVALID_FIELDS;
                    Log.write(`Campos inválidos: ${invalidFields}`);
                }
            } else {
                /* Caso a autorização do usuário tenha sido negada */
                result.authorized = authorized;
                status = StatusCode.UNAUTHORIZED;
                Log.write(`Acess denied to id:${id} and token:${token}.`);
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
     * Apaga uma ou mais tarefas do usuário. Todo o tratamento da requisição
     * deve ser feito pelo controlador de usuários, pois as tarefas só existem
     * no contexto de um usuário. Requer login.
     */
    async removeTasks(request:any, response:any) {
        let result:any = { };
        let messages:string[] = [];
        let status = StatusCode.INTERNAL_ERROR;

        const { id } = request.params;
        const { token } = request.headers;
        const { ids } = request.body;
        try {
            const authorized = await authority.authorize(id, token);
            if (authorized) {
                const updatedUser = await userService.deteleTasks(id,ids);
                const msg = `Tarefas removidas.`;
                messages.push(msg);
                Log.write(msg);
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
            Log.write(`Erro: ${error.name}`);
        } finally {
            /* Devolve o resultado da requisição */
            return response
                .status(status)
                .json({ result, messages });
        }
    }

    /**
     * Atualiza o status de uma ou mais tarefas para completa(s). Requer login.
     */
    async setAsCompleted(request:any, response:any) {
        let result:any = { };
        let messages:string[] = [];
        let status = StatusCode.INTERNAL_ERROR;

        const { id } = request.params;
        const { token } = request.headers;
        const { taskId } = request.body;
        try {
            const authorized = await authority.authorize(id, token);
            if (authorized) {
                const task = await service.setComplete(taskId);
                const msg = `Estado da tarefa alterado com sucesso.`;
                messages.push(msg);
                Log.write(msg);
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
            Log.write(`Erro: ${error.name}`);
        } finally {
            /* Devolve o resultado da requisição */
            return response
                .status(status)
                .json({ result, messages });
        }
    }

}

const taskController = new TaskController();
export { taskController };