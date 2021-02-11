const { response } = require("express");

const isAdminRole = async (req, res, next) => {
  if (!req.usuarioAuth) {
    return res.status(500).json({
      msg: "No se encontro el usuario",
    });
  }

  const { rol, nombre } = req.usuarioAuth;

  if (rol !== "ADMIN_ROL") {
    return res.status(401).json({ msg: "El usuario no tiene permisos " });
  }
  next();
};

const tieneRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuarioAuth) {
      return res.status(500).json({
        msg: "No se encontro el usuario",
      });
    }
    if (!roles.includes(req.usuarioAuth.rol)) {
      return res
        .status(401)
        .json({ msg: `El usuario no tiene permisos ${roles} ` });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  tieneRol,
};
