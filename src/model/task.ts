import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: String,
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDENTE', 'PERDIDA', 'CONCLUIDA'],
        required: true,
    },
    description: {
        type: String,
    }
});
const Task = mongoose.model("Task", taskSchema);
export { Task };