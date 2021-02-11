const { Producto } = require("../models");

//obtenergorias - paginado - total
const getProductos = async (req, res) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, producto] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    producto,
  });
};

//obtenergoria  - total
const getProduct = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  res.json(producto);
};

const storeProducto = async (req, res) => {
  const {
    nombre,
    precio,
    categoria,
    descripcion,
    disponible,
    estado,
  } = req.body;
  const nombredb = nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombredb });
  if (productoDB) {
    return res.status(400).json({
      err: `${nombredb} Ya existe`,
    });
  }

  const data = {
    nombre,
    usuario: req.usuarioAuth._id,
    categoria,
    precio,
    descripcion,
    disponible,
    estado,
  };

  const producto = await new Producto(data);
  producto.save();

  res.json(producto);
};

// Actualizar categoria por nombre
const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...resto } = req.body;

  const producto = await Producto.findByIdAndUpdate(id, resto);
  producto.update();

  res.json({ producto });
};

// borrar categoria
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findByIdAndUpdate(id, { estado: false });

  res.json({ producto });
};

module.exports = {
  getProductos,
  storeProducto,
  updateProducto,
  getProduct,
  deleteProduct,
};
