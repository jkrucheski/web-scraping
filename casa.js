const mongoose = require("mongoose");
// El modelo de Casa lo pongo en un único archivo para evitar repetir código.
// Esquema:
const CasaEsquema = new mongoose.Schema({
  titulo: String,
  direccion: String,
  precio: Number,
  imagenes: [{ type: String }],
  comodidades: { habitaciones: Number, camas: Number, baños: Number },
  servicios: [{ type: String }],
  numeroDeEstrellas: Number,
  numeroDeOpiniones: Number,
  url: String,
});
// Exportamos el modelo
module.exports = mongoose.model("Casa", CasaEsquema);
