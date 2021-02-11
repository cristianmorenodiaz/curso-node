const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");
const {
  validaRol,
  validaEmail,
  foundUserById,
} = require("../helpers/db.validators");

const { validarCampos, validarrutaJWT, tieneRol } = require("../middlewares");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    check("email", "El email no es correcto").isEmail(),
    check("email").custom(validaEmail),
    check("password", "El password debe tener mas de 6 letras").isLength({
      min: 6,
    }),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("rol").custom(validaRol),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "Usuario no validoo").isMongoId(),
    check("id").custom(foundUserById),
    check("rol").custom(validaRol),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarrutaJWT,
    //isAdminRole,
    tieneRol("ADMIN_ROL", "USER_ROL"),
    check("id", "Usuario no validoo").isMongoId(),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
