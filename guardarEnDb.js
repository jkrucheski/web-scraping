const mongoose = require("mongoose");
// Requiero el modelo de casa que esta en el archivo casa.js,
const Casa = require("./casa");

mongoose.connect("mongodb://127.0.0.1:27017/nextviaje", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function (error) {
  console.log("Error conectándome a MongoDB", error);
  process.exit(1);
});

exports.guardarCasas = async (casas) => {
  for (const casa of casas) {
    try {
      await new Casa(casa).save();
    } catch (error) {
      console.log(`Problema guardando casa con titulo ${titulo}`, error);
    }
  }
};
