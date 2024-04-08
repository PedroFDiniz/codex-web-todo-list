import { StatusCode } from "../util/statuscode";

class TaskController {
    /**
     * Cria novas tarefas para um usuário. Requer login.
     */
    scheduleTask(request:any, response:any) {
        let statusCode = StatusCode.INTERNAL_ERROR;
        const { id, token } = request.headers;
        const { taskName, taskContent, date } = request.body;

    }

    /**
     * Apaga uma ou mais tarefas do usuário. Requer login.
     */
    deleteTasks(request:any, response:any) {
        let statusCode = StatusCode.INTERNAL_ERROR;
        const { id, token } = request.headers;
        const { taskIds } = request.body;

    }

    /**
     * Atualiza o status de uma ou mais tarefas para completa(s). Requer login.
     */
    setAsCompleted(request:any, response:any) {
        let statusCode = StatusCode.INTERNAL_ERROR;
        const { id, token } = request.headers;
        const taskId = request.params.task;

    }

}

const taskController = new TaskController();
export { taskController };