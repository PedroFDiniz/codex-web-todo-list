import mongoose from 'mongoose';
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nome: String,
    idade: Number,
    sexo: String,
    email: String,
    senha: String
});
const Usuario = mongoose.model('Usuario', usuarioSchema);
export { Usuario };