import express from 'express';
import { config } from './config/config';
import mongoose from 'mongoose';

/**
 * Servidor backend da aplicação
 */
class Server {
    constructor(app = express()) {
        this.middleWare(app);
        this.database();
        this.allRoutes(app);
        this.startServer(app);
    }

    /**
     * Para validação de request
     * @param app o aplicativo express que receberá as requests
     */
    async middleWare(app: any) {
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
    async allRoutes(app: any) {
        const prefix = "/api";
        /* Endpoints */
        // app.get(`${prefix}/run`, async (request, response) => {
        //     await controller.run(request, response);
        // });
        /* app.<tipo de rota>(<endereço>, <função anônima> => {
            <funções a serem chamadas>
        }) */

    }

    async startServer(app: any) {
        app.listen(config.port, () => {
            console.log(`Servidor rodando no endereço http://localhost:${config.port}`);
        });
    }
}

export { Server };