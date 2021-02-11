const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    if (!usuario.estado) {
      return res.status(400).json({ msg: "El usuario no esta activo" });
    }

    const validaPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validaPassword) {
      return res.status(400).json({ msg: "El usuario no es valido" });
    }

    const token = await generarJWT(usuario.id);

    return res.json([usuario, token]);
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Ocurrio un error en el servidor" });
  }
};

module.exports = {
  login,
};
