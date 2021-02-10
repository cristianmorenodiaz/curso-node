const { Schema, model } = require('mongoose');
const { usuariosDelete } = require('../controllers/usuarios');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }, 
    email: {
        type: String,
        required: [true, 'El email es obligatorio'], 
        unique: true
    }, 
    password: {
        type: String,
        required: [true, 'El password es obligatorio'], 
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'Usuario', UsuarioSchema );