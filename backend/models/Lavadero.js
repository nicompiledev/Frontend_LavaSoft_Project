const mongoose = require("mongoose");

const ImagenSchema = new mongoose.Schema({
  id: { type: String, required: true },
  url: { type: String, required: true }
});

const ImagenLavadero = mongoose.model("ImagenLavadero", ImagenSchema);

module.exports = { ImagenLavadero };