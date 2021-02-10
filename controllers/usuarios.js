const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");

const usuariosGet = async(req, res) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limit))
    ]);

    res.json({ 
        total, 
        usuarios
    });
};

const usuariosPost = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });

    // Encriptar
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        body: usuario 
    })
};

const usuariosPut = async (req, res) => {
    const {id } = req.params;
    const{ _id, password, google, email, ...resto } = req.body;
    //validar si existe en bd
    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    usuario.update();

    res.json({ usuario }) 
};

const usuariosDelete = async  (req, res) => {
    const {id}  = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false });

    res.json({ usuario })
};

module.exports = {
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosDelete
}