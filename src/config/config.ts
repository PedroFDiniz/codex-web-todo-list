import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';

/* Usando o arquivo .env */
configDotenv({ path: resolve(__dirname, "../../.env")});

/* Método auxiliar */
const throwIfNot =
    function<T, K extends keyof T>(
        obj: Partial<T>,
        prop: K,
        msg?: string): T[K] {
            if(obj[prop] === undefined || obj[prop] === null) {
                throw new Error(
                    msg ||
                    (`Environment is missing variable ${String(prop)}. ` +
                    `Please add that variable to the .env file.`));
            } else return obj[prop] as T[K];
};

/* Para ter certeza que todas as variáveis de ambiente existem */
[
    "PORT",
    "NODE_ENV",
    "DB_PASSWORD",
    "DB_USERNAME",
    "DB_NAME",
    "DB_HOST",
].forEach(v => {
    throwIfNot(process.env, v);
});

let config = {
    port: Number(process.env.PORT) || 8080,
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    logging: true,
};

export { config };