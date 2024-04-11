import mongoose from "mongoose";
import { config } from "../config/config";
// import { userSchema } from "../model/user";
// import { taskSchema } from "../model/task";
import { User } from "../model/user";

class Database {
    // db:mongoose.Connection;

    constructor() {
        this.connect();
        // this.init();
    }

    // init = async () => {
    //     await this.model("User", userSchema);
    //     await this.model("Task", taskSchema);
    // }

    connect = async () => {
        const { username, password, database, host } = config;
        mongoose.connect(
            `mongodb+srv://${username}:${password}@${database}.${host}`
        ).then(() => console.log("database on"));
    }

    // async getState() { return this.db.readyState; }

    // get() { return this.db; }

    // async model(modelName:string, schema:mongoose.Schema) {
    //     return this.db.model(modelName, schema);
    // }
}

const db = new Database();
export { db };