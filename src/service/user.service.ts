import { User } from "../model/user";

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
        } catch (error) {
            console.error(error);
            console.log("errors");
        }
    }

    async find(email:string) {
        if (email && email !== "")
            return await User.findOne({ email }, "_id email password token");
        return null;
    }

    async findById(id:string) {
        if (id && id !== "")
            return await User.findById( id );
        return null;
    }

    async edit(
        id:string,
        name:string = "",
        age:number = 0,
        picture:string = ""
    ) {
        const filter = { id };
        let update:any = { };

        if (name !== "") update.name = name;
        if (age !== 0) update.age = age;
        if (picture !== "") update.picture = picture;

        return await User.findOneAndUpdate(filter, update);
    }

    async findAll() {
        return await User.find({});
    }

}

const service = new UserService();
export { service };