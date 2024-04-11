import mongoose from "mongoose";
import { db } from "../database/db";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    sex: {
        type: String,
        required: true,
        enum: ['M', 'F'],
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: String,
    picture: String,
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        }
    ]
});
let User = mongoose.model("User", userSchema);
export { User };