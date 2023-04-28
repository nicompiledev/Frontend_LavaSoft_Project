const { Reserva } = require('../models/Agendar.js');
const Lavadero  = require('../models/Lavadero.js');
const moment = require('moment');

const cerrarConexion = async (conexion) => {
  if (conexion) {
    try {
      await conexion.close();
    } catch (error) {
      console.log('Error al cerrar la conexión:', error);
    }
  }
};

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("Usuario conectado");

    socket.on("reservar", async (datos) => {
      let conexion;
      try {
        // validar que el lavadero exista
        const { id_lavadero } = datos;
        conexion = await conectarDB();
        const lavadero = await Lavadero.findById(id_lavadero);
        if (!lavadero) {
          throw new Error("El lavadero no existe");
        }

        // validar que la hora este disponible mongodb
        const { fecha, hora } = datos;
        const reservas = await Reserva.find({ id_lavadero, fecha, hora });

        // Obtener el número de reservas para esta hora
        const numReservas = reservas.length;

        // Verificar si el número de reservas es igual o mayor al número de espacios de trabajo disponibles
        if (numReservas >= lavadero.espacios_de_trabajo) {
          throw new Error("La hora no está disponible");
        }

        // guardar la reserva en mongodb
        const reservar = new Reserva(datos);
        const reservado = await reservar.save();
        if (!reservado) {
          throw new Error("No se pudo guardar la reserva");
        } else {
          const horasLibres = await horasDisponibles(id_lavadero, fecha);
          socket.nsp.emit("horasLibres", horasLibres);
        }
      } catch (error) {
        //socket.emit("errorReserva", error.message); PENDIENTE ANEXAR A LA VISTA
      } finally {
        cerrarConexion(conexion);
      }
    });


    socket.on("actualizarHorario", async (datos) => {
      const { id_lavadero, fecha } = datos;
      const horasLibres = await horasDisponibles(id_lavadero, fecha);
      socket.nsp.emit("horasLibres", horasLibres);
    });
  });
};
// Retornar horas disponibles

const horasDisponibles = async (id_lavadero, fecha) => {
  try {
    // 1. Obtener el lavadero por su ID
    const lavadero = await Lavadero.findOne({ _id: id_lavadero, estado: true });
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
    const horasLibres = horasDisponibles.filter((hora) => {
      // Obtener el número de reservas para esta hora
      const numReservas = reservas.filter((reserva) => reserva.hora === hora)
        .length;

      // Excluir esta hora si el número de reservas es igual o mayor al número de espacios de trabajo disponibles
      return numReservas < lavadero.espacios_de_trabajo;
    });

    console.log("horasLibres: ", horasLibres);
    return horasLibres;
  } catch (error) {
    console.error("Error al actualizar horario: ", error);
  }
};