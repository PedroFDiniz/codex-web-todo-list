import express from 'express';
import { config } from './config/config';
import mongoose from 'mongoose';

import { userController } from './controller/user.controller';
import { taskController } from './controller/task.controller';

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
     * Para validação de request
     * @param app o aplicativo express que receberá as requests
     */
    async middleware(app:any) {
        app.use(express.json());
    }

    /**
     * Para inicializar a base de dados
     */
    async database() {
        try {
            const { username, password, database, host } = config;
            await mongoose.connect(
                `mongodb+srv://${username}:${password}@${database}.${host}`);
            console.log("Conexão bem sucedida");
        } catch (error) {
            console.error(
                "Não foi possível estabelecer conexão com o BD",
                error
            );
        }
    }

    /**
     * Para descrição dos endpoints
     * @param app o aplicativo express que receberá as requests
     */
    async routes(app:any) {
        const prefix = "/api";
        /* Endpoints */
        app.get(`${prefix}/cadastrar`, userController.createUser);
        /* app.<tipo de rota>(<endereço>, <controller>.<funcao>) */

    }

    async startServer(app: any) {
        app.listen(config.port, () => {
            console.log(`Servidor rodando no endereço http://localhost:${config.port}`);
        });
    }
}

export { Server };