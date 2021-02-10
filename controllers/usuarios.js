const { response } = require('express');

const usuariosGet = (req, res) => {
    const { q, nombre = "No name" } = req.query;
    res.json({ 
        msg: 'Bienvenido desde el controlador',
        q,
        nombre
    });
};

const usuariosPost = (req, res) => {
    res.json({ 
        msg: 'POST Bienvenido controlador', 
        body: req.body })
};

const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.json({ msg: 'PUT Bienvenido contralodr', 
        id })
};

const usuariosDelete = (req, res) => {
    res.json({ msg: 'dELETE Bienvenido' })
};

module.exports = {
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosDelete
}