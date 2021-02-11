const { Router } = require("express");
const { check } = require("express-validator");

const existeProducto = require("../helpers/db.validators");
const { validarCampos, validarrutaJWT, tieneRol } = require("../middlewares");
const {
  getProductos,
  storeProducto,
  updateProducto,
  getProduct,
  deleteProduct,
} = require("../controllers/productos");

const router = Router();

router.get("/", getProductos);

// Middleware de validacion de Id
router.get(
  "/:id",
  [
    check("id", "Id de categoria no valido no validoo").isMongoId(),
    validarCampos,
    check("id").custom(existeProducto),
  ],
  getProduct
);

// Crear categoria - privado - token valido
router.post(
  "/",
  [
    validarrutaJWT,
    check("nombre", "El nombre de la categoria es necesario").not().isEmpty(),
    check("disponible", "El estatus de la categoria es necesario")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  storeProducto
);

// Actualizar categoria - privado- cualquiera token
router.put(
  "/:id",
  [
    validarrutaJWT,
    check("id", "Id de producto no valido no validoo").isMongoId(),
    check("nombre", "Escribe un nombre de categoria").not().isEmpty(),
    validarCampos,
  ],
  updateProducto
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
  deleteProduct
);

module.exports = router;
