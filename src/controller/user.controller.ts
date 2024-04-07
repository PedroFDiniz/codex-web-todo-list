import { UserService } from "../service/user.service";

/**
 * Faz a ligação das rotas com as funções do serviço
 */
class UserController {
    /**
     * Cadastra um novo usuário. Não requer login.
     */
    createUser(request:JSON, response:JSON) {

    }

    /**
     * Retorna todas as informações do perfil do usuário. Requer login.
     */
    getUser(request:JSON, response:JSON) {

    }

    /**
     * Altera informações cadastrais do usuário. Requer login.
     */
    editUser(request:JSON, response:JSON) {

    }

    /**
     * Cria novas tarefas para um usuário. Requer login.
     */
    scheduleTasks(request:JSON, response:JSON) {

    }

    /**
     * Apaga uma ou mais tarefas do usuário. Requer login.
     */
    deleteTasks(request:JSON, response:JSON) {

    }

    /**
     * Atualiza o status de uma ou mais tarefas para completa(s). Requer login.
     */
    setAsCompleted(request:JSON, response:JSON) {

    }

    /**
     * Retorna todas as tarefas do usuário. Requer login.
     */
    getTasks(request:JSON, response:JSON) {

    }
}

const userController = new UserController();
export { userController };