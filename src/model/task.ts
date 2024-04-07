import mongoose from 'mongoose';
const { Schema } = mongoose;

// TODO completar o esquema abaixo
const taskSchema = new Schema({
    
});
const Task = mongoose.model('Task', taskSchema);
export { Task };