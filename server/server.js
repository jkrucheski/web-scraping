const express = require("express");
const mongoose = require("mongoose");
const Casa = require("../casa");

mongoose.connect("mongodb://127.0.0.1:27017/nextviaje", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", function (error) {
  console.log("Error conectándome a MongoDB", error);
  process.exit(1);
});

const app = express();
const puerto = 3010;

app.get("/api/casas", async (req, res) => {
  const {
    numeroDeEstrellas,
    servicios,
    comodidad,
    numeroDeComodidad,
    precioMaximo,
    precioMinimo,
  } = req.query;

  const query = {};

  if (numeroDeEstrellas) {
    query.numeroDeEstrellas = Number(numeroDeEstrellas);
  }

  if (servicios) {
    const s = servicios.split(",");
    query.servicios = { $all: s };
  }

  if (comodidad && numeroDeComodidad) {
    query[`comodidades.${comodidad}`] = Number(numeroDeComodidad);
  }

  if (precioMinimo && precioMaximo) {
    query.precio = { $gte: Number(precioMinimo), $lte: Number(precioMaximo) };
  } else {
    if (precioMaximo) {
      query.precio = { $lte: Number(precioMaximo) };
    }

    if (precioMinimo) {
      query.precio = { $gte: Number(precioMinimo) };
    }
  }

  const resultados = await Casa.find(query);

  res.json(resultados);
});

app.listen(puerto, () => console.log(`Escuchando en puerto: ${puerto}`));
