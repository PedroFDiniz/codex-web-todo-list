import express from "express";
import { config } from "./config/config";

import { db } from "./database/db";
import { userController } from "./controller/user.controller";
import { taskController } from "./controller/task.controller";
import { authority } from "./controller/authentication.controller";

/**
 * Servidor backend da aplicação
 */
class Server {
    constructor(app = express()) {
        this.middleware(app);
        this.database();
        this.routes(app);
        this.startServer(app);
    }

    /**
     * Para garantir que as requisições terão corpo JSON.
     * @param app o aplicativo express que receberá as requisições.
     */
    async middleware(app:any) {
        app.use(express.json());
    }

    /**
     * Para inicializar a base de dados.
     */
    async database() {
        // db.init();
        db.connect();
    }

    /**
     * Para descrição dos endpoints.
     * @param app o aplicativo express que receberá as requisições.
     */
    async routes(app:any) {
        /* Endpoints */
        /* app.<tipo de rota>(<endereço>, <controller>.<funcao>) */
        app.post(`/cadastrar`, userController.createUser);
        app.get(`/login`, authority.login);

    }

    /**
     * Inicializa o servidor Express para receber requisições.
     * @param app 
     */
    async startServer(app: any) {
        app.listen(config.port, () => {
            console.log(
                `Servidor rodando no endereço http://localhost:${config.port}`
            );
        });
    }
}

export { Server };