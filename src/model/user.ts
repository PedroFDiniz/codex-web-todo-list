import mongoose from "mongoose";
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    name: String,
    age: Number,
    sex: String,
    email: String,
    password: String,
    picture: String,
});
const User = mongoose.model("User", usuarioSchema);
export { User };