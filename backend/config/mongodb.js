//import { Lavadero, Reserva } from "../models/Lavadero.js";
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.set("strictQuery", false);

const conectarMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
/*
    const nuevoLavadero = new Lavadero({
      hora_apertura: '9:00 AM',
      hora_cierre: '5:00 PM',
    });

    const nuevaReserva = new Reserva({
      id_lavadero: nuevoLavadero._id,
      fecha: '2023-03-20',
      hora: '10:00 AM',
    });

    await nuevoLavadero.save();
    await nuevaReserva.save();*/
    console.log("Conexión a la base de datos MongoDB exitosa");
  } catch (error) {
    console.error(`Error al conectarse a la base de datos MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = conectarMongoDB;
