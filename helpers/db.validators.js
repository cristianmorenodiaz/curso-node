const Role = require("../models/rol");
const Usuario = require("../models/usuario");

const validaRol = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol) {
        throw new Error("El rol no existe")
    }
}

const validaEmail = async(email = '') => {
    const existeEmail = await Usuario.findOne({ email });
    if(existeEmail){
        throw new Error("El email ya existe");
    }
}

const foundUserById = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


module.exports = {
    validaRol, 
    validaEmail, 
    foundUserById
}