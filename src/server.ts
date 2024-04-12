import express from "express";
import { config } from "./config/config";
import mongoose from 'mongoose';

import { Database } from "./database/db";
import { userController } from "./controller/user.controller";
import { taskController } from "./controller/task.controller";
import { authority } from "./controller/authentication.controller";

/**
 * Servidor backend da aplicação
 */
class Server {
    #db:Database;

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
        this.#db = new Database();
        await this.#db.hasConnected;
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
        app.get(`/debug`, userController.findAll);
    }

    /**
     * Inicializa o servidor Express para receber requisições.
     * @param app o aplicativo express que receberá as requisições.
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