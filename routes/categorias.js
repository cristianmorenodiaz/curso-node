const { Router } = require("express");
const { check } = require("express-validator");
const {
  creaCategoria,
  getCategorias,
  onbtenerCategoria,
  categoriaModificar,
  categoriaEliminar,
} = require("../controllers/categorias");
const existeCategoria = require("../helpers/db.validators");
const { validarCampos, validarrutaJWT, tieneRol } = require("../middlewares");

const router = Router();

router.get("/", getCategorias);

// Middleware de validacion de Id
router.get(
  "/:id",
  [
    check("id", "Id de categoria no valido no validoo").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoria),
  ],
  onbtenerCategoria
);

// Crear categoria - privado - token valido
router.post(
  "/",
  [
    validarrutaJWT,
    check("nombre", "El nombre de la categoria es necesario").not().isEmpty(),
    check("estado", "El estatus de la categoria es necesario").not().isEmpty(),
    validarCampos,
  ],
  creaCategoria
);

// Actualizar categoria - privado- cualquiera token
router.put(
  "/:id",
  [
    validarrutaJWT,
    check("id", "Id de categoria no valido no validoo").isMongoId(),
    check("nombre", "Escribe un nombre de categoria").not().isEmpty(),
    validarCampos,
  ],
  categoriaModificar
);

// Borra una categoria - Solo Admin
router.delete(
  "/:id",
  [
    validarrutaJWT,
    tieneRol("ADMIN_ROL", "USER_ROL"),
    check("id", "Id de categoria no valido no validoo").isMongoId(),
    validarCampos,
  ],
  categoriaEliminar
);

module.exports = router;
