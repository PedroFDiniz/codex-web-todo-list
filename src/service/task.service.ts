import mongoose from "mongoose";
import { Task } from "../model/task";
import { Log } from "../util/log";

/**
 * Descreve todas as interações do modelo "Task".
 */
class TaskService {
    async create(name:string, date:string, description:string) {
        try {
            return await Task.create({
                "name": name,
                "date": date,
                "status": "PENDENTE",
                "description": description,
            });
        } catch (error:any) { return null; }
    }

    async setComplete(id:string) {
        try {
            const task = await Task.findById(id);
            if (!task || task.status === "CONCLUIDA") return null;
            task.status = "CONCLUIDA";
            return await task.save();
        } catch (error:any) { return null; }
    }

    async fetch(id:string) {
        try { return await Task.findById(id); }
        catch (error:any) { return null; }
    }

    async fetchMany(ids:mongoose.Types.ObjectId[]) {
        try {
            const tasks = await Task.find({
                '_id': { $in: ids }
            },'name date status description');
            return tasks;
        } catch (error:any) { return null; }
    }

    async delete(ids:string[]) {
        try { return await Task.deleteMany({ '_id': { $in: ids }}); }
        catch (error:any) { return null; }
    }
}
const service = new TaskService();
export { service };