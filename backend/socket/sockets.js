const { Lavadero, Reserva } = require('../models/Agendar.js');
const moment = require('moment');


module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("Usuario conectado");

    socket.on("reservar", async (datos) => {
      console.log("Reserva recibida: ", datos);
      const reservar = new Reserva(datos);
      await reservar.save();

    });

    socket.on("actualizarHorario", async (datos) => {
      console.log(datos)
      let { id_lavadero, fecha } = datos;

      try {
        // 1. Obtener el lavadero por su ID
        const lavadero = await Lavadero.findById(id_lavadero);

        if (!lavadero) {
          throw new Error("Lavadero no encontrado");
        }

        // 2. Calcular todas las horas disponibles
        let horaActual = moment(lavadero.hora_apertura, "h:mm A");
        const horaCierre = moment(lavadero.hora_cierre, "h:mm A");
        const intervalo = 30; // Intervalo de tiempo entre horas disponibles en minutos

        const horasDisponibles = [];

        while (horaActual.isBefore(horaCierre)) {
          horasDisponibles.push(horaActual.format("h:mm A"));
          horaActual.add(intervalo, "minutes");
        }

        // 3. Obtener todas las reservas del lavadero para el día específico
        const reservas = await Reserva.find({ id_lavadero, fecha });

        // 4. Filtrar las horas disponibles excluyendo las horas reservadas
        const horasReservadas = reservas.map((reserva) => reserva.hora);
        const horasLibres = horasDisponibles.filter(
          (hora) => !horasReservadas.includes(hora)
        );

        console.log("Horas disponibles: ", horasLibres);

        socket.nsp.emit("horasLibres", horasLibres);
      } catch (error) {
        console.error("Error al actualizar horario: ", error);
        socket.emit("errorActualizacion", error.message);
      }
    });
  });
};