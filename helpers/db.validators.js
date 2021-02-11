const { Usuario, Role, Categoria, Producto } = require("../models");

const validaRol = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error("El rol no existe");
  }
};

const validaEmail = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error("El email ya existe");
  }
};

const foundUserById = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

const existeCategoria = async (id = "") => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id de categoria no existe ${id}`);
  }
};

const existeProducto = async (id = "") => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id de producto no existe ${id}`);
  }
};

module.exports = {
  validaRol,
  validaEmail,
  foundUserById,
  existeCategoria,
  existeProducto,
};
