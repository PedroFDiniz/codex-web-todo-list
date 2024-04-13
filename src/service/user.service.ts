import mongoose, { ObjectId } from "mongoose";
import { User } from "../model/user";
import { Log } from "../util/log";
import { service as tasks } from "./task.service";

/**
 * Descreve todas as interações do modelo "User".
 */
class UserService {
    /**
     * Cria um novo usuário.
     * @param { string } name O nome completo do usuário.
     * @param { number } age A idade do usuário.
     * @param { string } sex O sexo do usuário. Aceita apenas
     * valores "M" ou "F".
     * @param email Email do usuário. Será usado para login.
     * @param password Senha do usuário.
     * @returns Um documento User direto do banco de dados, como descrito no
     * esquema mongoose em 'src/model/user.ts'.
     */
    async create(
        name:string,
        age:number,
        sex:string,
        email:string,
        password:string
    ) {
        try {
            const newUser = await User.create({
                "name": name,
                "age": age,
                "sex": sex,
                "email": email,
                "password": password,
            });
            return newUser;
        } catch (error:any) {
            return null;
        }
    }

    /**
     * Resgata um usuário do banco de dados.
     * @param { string } id O id do usuário a ser resgatado.
     * @returns Retorna um objeto usuário como descrito no esquema mongoose
     * em 'src/model/user.ts'.
     */
    async get(id:string) {
        if (!id || id === "") return null;
        const user =
            await User.findById(id, "name age sex email picture tasks");
        if (!user) return null;
        const taskList:any = await tasks.fetchMany(user.tasks);
        return {
            name: user.name,
            age: user.age,
            sex: user.sex,
            email: user.email,
            picture: user.picture,
            tasks: taskList,
        }
    }

    /**
     * Resgata todas as tarefas pertencentes a um usuário.
     * @param { string } id O id do usuário cujas tarefas devem ser resgatadas.
     * @returns Uma lista contendo objetos Task, como descritos no esquema
     * mongoose em 'src/model/task.ts'.
     */
    async getTasks(id:string) {
        const user = await User.findById(id, "_id tasks");
        if (!user) return null;
        const taskList:any = await tasks.fetchMany(user.tasks);

        return taskList;
    }

    /**
     * Apaga tarefas da lista de um usuário e do banco de dados.
     * @param { string } userId O usuário cujas tarefas serão apagadas.
     * @param { string[] } ids Os ids das tarefas a serem apagadas.
     */
    async deteleTasks(userId:string, ids:string[]) {
        for (let id in ids) {
            const updatedUser = await User.updateOne({
                id: userId
            }, {
                $pullAll: {
                    tasks: [{_id: ids[id]}]
                }
            });
        }
        tasks.delete(ids);
    }

    /**
     * Busca apenas os quatro campos relevantes para o login de um usuário.
     * @param { string } email O endereço de email do usuário.
     * @returns Retorna um objeto User, mas apenas com os campos '_id',
     * 'email', 'password' e 'token'.
     */
    async fetchLogin(email:string) {
        return await User.findOne({ email }, "_id email password token");
    }

    /**
     * Encontra um usuário pelo seu ID.
     * @param { string } id O id do usuário a ser resgatado
     * @returns Um objeto usuário.
     */
    async findById(id:string) {
        if (id && id !== "")
            return await User.findById( id );
        return null;
    }

    /**
     * Resgata um usuário do banco de dados a partir de uma das 3 opções de
     * campos: id, nome ou email. A pesquisa é executada sequencialmente nesta
     * exata ordem, e apenas resgata o primeiro que for encontrado.
     * @param { string? } id O id do usuário em questão.
     * @param { string? } name O nome do usuário em questão.
     * @param { string? } email O email do usuário em questão.
     * @returns Um objeto usuário.
     */
    async findUser(id:string, name:string, email:string) {
        if (id)     return await User.findById( id );
        if (name)   return await User.find({ name: name });
        if (email)  return await User.find({ email: email });
    }

    /**
     * Edita informações de um usuário.
     * @param { string } id O id do usuário a ser alterado
     * @param { string? } name O novo nome do usuário. Opcional.
     * @param { number? } age A nova idade do usuário. Opcional.
     * @param { string? } picture A nova imagem do usuário. Opcional.
     * @returns O objeto User, já atualizado.
     */
    async edit(
        id:string,
        name:string = "",
        age:number = 0,
        picture:string = ""
    ) {
        const filter = { id: id };
        let update:any = { };

        if (name !== "") update.name = name;
        if (age !== 0) update.age = age;
        if (picture !== "") update.picture = picture;

        return await User.findOneAndUpdate(filter, update);
    }

    /**
     * Resgata todos os usuários.
     * @returns Uma lista contendo todos os usuários presentes no banco.
     */
    async findAll() {
        let result = await User.find({ });
        return result;
    }

    /**
     * Adiciona uma tarefa à lista do usuário
     * @param { string } userId O ID do usuário a receber a tarefa.
     * @param { string } taskId O ID da tarefa a ser adicionada.
     * @returns O objeto usuário, já atualizado.
     */
    async addTask(userId: any, taskId: any) {
        const filter = { _id: userId };
        const update = { $push: { tasks: taskId } };
        return await User.findByIdAndUpdate(filter, update);
    }
}

const service = new UserService();
export { service };