const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email no debe ser nulo").isEmail(),
    check("password", "Escribe el password").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
