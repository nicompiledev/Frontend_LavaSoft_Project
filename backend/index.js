const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { conectarMySqlDB, conectarMongoDB } = require('./config/index.js');
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const adminRouter = require('./routes/adminRoutes.js');
const initSockets = require('./socket/sockets.js');
const socketIO = require('socket.io');


// Imports

const app = express();
const server = require("http").createServer(app);
const io = socketIO(server, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Configuración de express y socket

dotenv.config();
initSockets(io)

conectarMySqlDB();
conectarMongoDB()
  .then(async () => {
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos", error);
    process.exit(1);
  });

// Middleware

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El Origen del Request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/admins", adminRouter);

// Inicio del servidor

const PORT = process.env.PORT || 4000;
