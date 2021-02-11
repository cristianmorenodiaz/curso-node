const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const validarrutaJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    res.status(404).json({ msg: "No hay token " });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    // leer el usuario
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res
        .status(404)
        .json({ msg: "Usuario no tiene permitido hacer cambios s" });
    }

    if (!usuario.estado) {
      res
        .status(404)
        .json({ msg: "Usuario no tiene permitido hacer cambios " });
    }

    req.usuarioAuth = usuario;
    next();
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

module.exports = {
  validarrutaJWT,
};
