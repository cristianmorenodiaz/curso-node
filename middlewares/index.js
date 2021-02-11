const validarCampos = require("../middlewares/validar-campos");
const validarrutaJWT = require("../middlewares/validarJWT");
const validaRoles = require("../middlewares/validar-roles");

module.exports = {
  ...validarCampos,
  ...validarrutaJWT,
  ...validaRoles,
};
