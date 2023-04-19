const cloudinary = require('cloudinary').v2;
const conectarDB = require("../config/mysql.js");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'imagenes',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => file.fieldname + '-' + Date.now(),
  }
});

const upload = multer({ storage: storage }).single('image');
const upload2 = multer({ storage: storage }).array('images');

const uploadSingle = async (req, res) => {
  try {
    conexion = await conectarDB();
    upload(req, res, async (err) => {
      if (err) {
        res.status(500).send('Hubo un error al subir la imagen');
      } else {
        const imageUrl = req.file.path;
        const sql = 'INSERT INTO imagenes (url) VALUES (?)';
        conexion.execute(sql, [imageUrl], (error, result) => {
          if (error) {
            res.status(500).send('Hubo un error al guardar la imagen en la base de datos');
          } else {
            res.status(200).send(result);
          }
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const uploadMultiple = async (req, res) => {
  try {
    conexion = await conectarDB();
    upload2(req, res, async (err) => {
      if (err) {
        res.status(500).send('Hubo un error al subir las imágenes');
      } else {
        const imageUrls = req.files.map((file) => file.path);
        const sql = 'INSERT INTO imagenes (url) VALUES ?';
        const values = imageUrls.map((url) => [url]);

        await conexion.query(sql, [values], (error, result) => {
          if (error) {
            res.status(500).send('Hubo un error al guardar las imágenes en la base de datos');
          } else {
            res.status(200).send(result);
          }
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getImages = async (req, res) => {
  conexion = await conectarDB();
  const sql = 'SELECT * FROM imagenes';
  const [row] = await conexion.execute(sql);
  res.status(200).send(row);
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  getImages,
}