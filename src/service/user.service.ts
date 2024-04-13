import mongoose, { ObjectId } from "mongoose";
import { User } from "../model/user";
import { Log } from "../util/log";
import { service as tasks } from "./task.service";

/**
 * Descreve todas as interações do modelo "User".
 */
class UserService {
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
            Log.write(`Error: ${error.name}`);
            return null;
        }
    }

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

    async getTasks(id:string) {
        const user = await User.findById(id, "_id tasks");
        if (!user) return null;
        const taskList:any = await tasks.fetchMany(user.tasks);

        return taskList;
    }

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

    async fetchLogin(email:string) {
        return await User.findOne({ email }, "_id email password token");
    }

    async findById(id:string) {
        if (id && id !== "")
            return await User.findById( id );
        return null;
    }

    async findUser(id:string, name:string, email:string) {
        if (id)     return await User.findById( id );
        if (name)   return await User.find({ name: name });
        if (email)  return await User.find({ email: email });
    }

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

    async findAll() {
        let result = await User.find({ });
        return result;
    }

    async addTask(userId: any, taskId: any) {
        const filter = { _id: userId };
        const update = { $push: { tasks: taskId } };
        return await User.findByIdAndUpdate(filter, update);
    }
}

const service = new UserService();
export { service };