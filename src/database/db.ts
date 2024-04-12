import mongoose from "mongoose";
import { config } from "../config/config";
import { Log } from "../util/log";

class Database {
    #connection:mongoose.Connection;
    hasConnected:Promise<any>;

    constructor() {
        this.connect();
        this.#connection = mongoose.connection;
        this.#connection.on( 'disconnecting', this.#onDisconnecting );
        this.#connection.on( 'disconnected', this.#onDisconnected );
        this.#connection.on( 'reconnected', this.#onReconnected );
        this.#connection.on( 'connected', this.#onConnected );
        this.#connection.on( 'close', this.#onClose );
        this.#connection.on( 'open', this.#onOpen );
    }

    connect = async () => {
        const { username, password, database, host } = config;
        this.hasConnected = mongoose.connect(
            `mongodb+srv://${username}:${password}@${database}.${host}`
        );
    }

    #onClose = () =>
    { Log.write("Database: Closed."); }
    #onConnected = () =>
    { Log.write("Database: Establishing connection."); }
    #onDisconnected = () =>
    { Log.write("Database: Connection lost."); }
    #onDisconnecting = () =>
    { Log.write("Database: Disconnecting."); }
    #onOpen = () =>
    { Log.write("Database: Connection open."); }
    #onReconnected = () =>
    { Log.write("Database: Connection restored."); }
}

export { Database };