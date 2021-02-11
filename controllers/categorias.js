const { Categoria } = require("../models");

//obtenergorias - paginado - total
const getCategorias = async (req, res) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categoria] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    categoria,
  });
};

//obtenergoria  - total
const onbtenerCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id);
  res.json(categoria);
};

const creaCategoria = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();
  console.log(nombre);
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
      err: `${nombre} Ya existe`,
    });
  }

  const data = {
    nombre,
    usuario: req.usuarioAuth._id,
  };

  const categoria = await new Categoria(data);
  categoria.save();

  res.json(categoria);
};

// Actualizar categoria por nombre
const categoriaModificar = async (req, res) => {
  const { id } = req.params;
  const { edit, usuario, ...resto } = req.body;

  const categoria = await Categoria.findByIdAndUpdate(id, resto);
  categoria.update();

  res.json({ categoria });
};

// borrar categoria
const categoriaEliminar = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

  res.json({ categoria });
};

module.exports = {
  getCategorias,
  creaCategoria,
  onbtenerCategoria,
  categoriaModificar,
  categoriaEliminar,
};
