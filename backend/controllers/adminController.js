const conectarDB = require("../config/mysql.js");
const generarJWT = require("../helpers/generarJWT.js");
const generarId = require("../helpers/generarId.js");
const emailRegistro = require("../helpers/lavaderos/emailRegistro.js");
const emailOlvidePassword = require("../helpers/emailOlvidePassword.js");
const bcrypt = require("bcrypt");

// Modelos
const { ImagenLavadero } = require("../models/Lavadero.js");

const registrarLavadero = async (req, res) => {

  const { nombre, ciudad, direccion, telefono, correo_electronico, contrasena, horario_atencion } = req.body;

  const token = generarId();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(contrasena, salt);
  const id = await bcrypt.hash(nombre + correo_electronico, salt);


  let conexion;
  try {
    conexion = await conectarDB();

    // Verificar si el usuario ya existe
    const [row] = await conexion.execute(
      `SELECT id_lavadero FROM lavaderos WHERE correo_electronico = ?`,
      [correo_electronico]
    );

    if (row.length > 0) {
      res.status(400).json({ msg: "El usuario ya existe" });
      return;
    }

    await conexion.execute(
      `INSERT INTO lavaderos (id_lavadero, nombre, ciudad, direccion, telefono, token, correo_electronico, contrasena, horario_atencion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [id, nombre, ciudad, direccion, telefono, token, correo_electronico, hashedPassword, horario_atencion]
    );

    res.status(200).json({ msg: "Usuario registrado correctamente" });

    // Si la inserción fue exitosa, guardar imagenes:
    if (!req.files) {
      res.status(500).send('Hubo un error al subir las imágenes');
    } else {
      const imageUrls = req.files.map((file) => file.path);
      const sql = 'INSERT INTO imagenes_lavaderos (id_lavadero, ruta_imagen) VALUES ?';
      const values = imageUrls.map((url) => [id, url]);

      await conexion.query(sql, [values], (error, result) => {
        if (error) {
          res.status(500).send('Hubo un error al guardar las imágenes en la base de datos');
        }
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  } finally {
    if (conexion) {
      try {
        await conexion.close();
      } catch (error) {
        console.log('Error al cerrar la conexión:', error);
      }
    }
  }
};



const loguearAdmin = async (req, res) => {
  const { correo_electronico, contrasena } = req.body;
  let conexion;
  try {

    conexion = await conectarDB();

    const [row] = await conexion.execute(
      `SELECT id_administrador, contrasena FROM administradores WHERE correo_electronico = ?`,
      [correo_electronico]
    );

    if (row.length === 0) {
      res.status(400).json({ msg: "El usuario no existe" });
      return;
    }

    const usuarioAdmin = row[0];

    const validPassword = await bcrypt.compare(contrasena, usuarioAdmin.contrasena);

    if (!validPassword) {
      res.status(400).json({ msg: "Contraseña incorrecta" });
      return;
    }

    // Generar el JWT y devolverlo:
    const token = generarJWT(usuarioAdmin.id_administrador);
    // Autenticar
    res.json({
      id_usuario: usuarioAdmin.id_administrador,
      correo_electronico: usuarioAdmin.correo_electronico,
      token: token,
    });

    res.status(200).json({ msg: "Usuario logueado correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  } finally {
    if (conexion) {
      try {
        await conexion.close();
      } catch (error) {
        console.log('Error al cerrar la conexión:', error);
      }
    }
  }
};


const getLavederos = async (req, res) => {
  let conexion;
  try {
    conexion = await conectarDB();

    const [row] = await conexion.execute(
      `SELECT id_lavadero, nombre, ciudad, direccion, telefono, correo_electronico, horario_atencion FROM lavaderos`
    );

    res.status(200).json({ lavaderos: row });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  } finally {
    if (conexion) {
      try {
        await conexion.close();
      } catch (error) {
        console.log('Error al cerrar la conexión:', error);
      }
    }
  }
};

const getLavadero = async (req, res) => {
  const { id_lavadero } = req.params;
  let conexion;
  try {
    conexion = await conectarDB();

    const [row] = await conexion.execute(
      `SELECT id_lavadero, nombre, ciudad, direccion, telefono, correo_electronico, horario_atencion FROM lavaderos WHERE id_lavadero = ?`,
      [id_lavadero]
    );

    const lavadero = row[0];

    if (!lavadero) {
      res.status(400).json({ msg: "El lavadero no existe" });
      return;
    }

    res.status(200).json(lavadero);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  } finally {
    if (conexion) {
      try {
        await conexion.close();
      } catch (error) {
        console.log('Error al cerrar la conexión:', error);
      }
    }
  }
};

const modificarLavadero = async (req, res) => {
  const { id_lavadero } = req.params;
  const { nombre, ciudad, direccion, telefono, correo_electronico, horario_atencion } = req.body;

  let conexion;
  try {
    conexion = await conectarDB();

    const [row] = await conexion.execute(
      `SELECT id_lavadero FROM lavaderos WHERE id_lavadero = ? and estado = true`,
      [id_lavadero]
    );

    const lavadero = row[0];

    if (!lavadero) {
      res.status(400).json({ msg: "El lavadero no existe" });
      return;
    }

    await conexion.execute(
      `UPDATE lavaderos SET nombre = ?, ciudad = ?, direccion = ?, telefono = ?, correo_electronico = ?, horario_atencion = ? WHERE id_lavadero = ?`,
      [nombre, ciudad, direccion, telefono, correo_electronico, horario_atencion, id_lavadero]
    );

    res.status(200).json({ msg: "Lavadero modificado correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  } finally {
    if (conexion) {
      try {
        await conexion.close();
      } catch (error) {
        console.log('Error al cerrar la conexión:', error);
      }
    }
  }
};

const eliminarLavadero = async (req, res) => {
  const { id_lavadero } = req.params;

  let conexion;
  try {
    conexion = await conectarDB();

    const [row] = await conexion.execute(
      `SELECT id_lavadero FROM lavaderos WHERE id_lavadero = ? and estado = true`,
      [id_lavadero]
    );

    const lavadero = row[0];

    if (!lavadero) {
      res.status(400).json({ msg: "El lavadero no existe" });
      return;
    }

    await conexion.execute(
      `UPDATE lavaderos SET estado = false WHERE id_lavadero = ? and estado = false`,
      [id_lavadero]
    );

    res.status(200).json({ msg: "Lavadero eliminado correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  } finally {
    if (conexion) {
      try {
        await conexion.close();
      } catch (error) {
        console.log('Error al cerrar la conexión:', error);
      }
    }
  }
};



module.exports = {
  loguearAdmin,
  registrarLavadero,
  getLavederos,
  getLavadero,
  modificarLavadero,
  eliminarLavadero
};



