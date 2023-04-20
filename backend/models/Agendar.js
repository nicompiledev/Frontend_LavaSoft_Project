const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  id_lavadero: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
});

const Reserva = mongoose.model("Reserva", reservaSchema);

module.exports = { Reserva };