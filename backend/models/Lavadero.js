const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const generarId = require("../helpers/generarId.js");

const LavaderoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ciudad: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  correo_electronico: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  hora_apertura: { type: String, required: true },
  hora_cierre: { type: String, required: true },
  estado: { type: Boolean, default: true },
  confirmado: {type: Boolean, default: false,},
  token: { type: String, default: generarId() },
  imagenes: [{ type: String }] // nuevo campo de matriz de imágenes
});

// pre-save hook
LavaderoSchema.pre("save", async function (next) {
  // Hash the password only if it has been modified or is new
  if (!this.isModified("contrasena")) {
    next();
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.contrasena, salt);
    this.contrasena = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// method to compare password
LavaderoSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.contrasena);
};

const Lavadero = mongoose.model("Lavadero", LavaderoSchema);

module.exports = Lavadero;
