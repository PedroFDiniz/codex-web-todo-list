import mongoose from "mongoose";
import { Task } from "../model/task";
import { Log } from "../util/log";

/**
 * Descreve todas as interações do modelo "Task".
 */
class TaskService {
    /**
     * Cria uma nova tarefa. O valor base do status é 'PENDENTE'.
     * @param { string? } name O nome a tarefa. Opcional.
     * @param { string } date A data da tarefa. Obrigatória.
     * @param { string? } description A descrição da tarefa. Opcional.
     * @returns Um objeto Tarefa, como descrito no esquema mongoose em
     * 'src/model/task.ts'.
     */
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

    /**
     * Altera o campo 'status' de uma tarefa para 'CONCLUIDA'.
     * @param { string } id A tarefa a ser alterada.
     * @returns 
     */
    async setComplete(id:string) {
        try {
            const task = await Task.findById(id);
            if (!task || task.status === "CONCLUIDA") return null;
            task.status = "CONCLUIDA";
            return await task.save();
        } catch (error:any) { return null; }
    }

    /**
     * Busca uma tarefa.
     * @param { string } id O ID da tarefa a ser buscada.
     * @returns Um objeto Task.
     */
    async fetch(id:string) {
        try { return await Task.findById(id); }
        catch (error:any) { return null; }
    }

    /**
     * Busca várias tarefas.
     * @param { string[] } ids Os IDs das tarefas a serem buscadas.
     * @returns Uma lista de objetos Task.
     */
    async fetchMany(ids:mongoose.Types.ObjectId[]) {
        try {
            const tasks = await Task.find({
                '_id': { $in: ids }
            },'name date status description');
            return tasks;
        } catch (error:any) { return null; }
    }

    /**
     * Apaga tarefas do banco de dados.
     * @param { string[] } ids Os IDs das tarefas a serem apagadas.
     * @returns 
     */
    async delete(ids:string[]) {
        try { return await Task.deleteMany({ '_id': { $in: ids }}); }
        catch (error:any) { return null; }
    }
}
const service = new TaskService();
export { service };