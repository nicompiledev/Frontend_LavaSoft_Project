const mongoose = require("mongoose");

const lavaderoSchema = new mongoose.Schema({
  hora_apertura: { type: String, required: true },
  hora_cierre: { type: String, required: true },
});

const reservaSchema = new mongoose.Schema({
  id_lavadero: { type: mongoose.Schema.Types.ObjectId, ref: 'Lavadero', required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
});

const Lavadero = mongoose.model("Lavadero", lavaderoSchema);
const Reserva = mongoose.model("Reserva", reservaSchema);

module.exports = { Lavadero, Reserva };