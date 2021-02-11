const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: "String",
    required: [true, "Nombre Requerido"],
  },
  estado: {
    type: "String",
    required: [true, "Estado Requerido"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: {
    type: "String",
  },
  disponible: { type: Boolean, default: true },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, _id, ...producto } = this.toObject();
  producto.uid = _id;
  return producto;
};

module.exports = model("Producto", ProductoSchema);
