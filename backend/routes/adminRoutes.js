const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_uploads',
    format: async (req, file) => 'png',
    public_id: (req, file) => file.originalname
  }
});

const upload = multer({ storage: storage });

const {
  loguearAdmin,
  registrarLavadero,
  getLavederos,
  getLavadero,
  modificarLavadero,
  eliminarLavadero,
} = require('../controllers/adminController.js');


// área publica
router.post("/login", loguearAdmin);
router.post("/registrar-lavadero", upload.array('images'), registrarLavadero);
router.get("/lavaderos", getLavederos);
router.get("/lavaderos/:id_lavadero", getLavadero);
router.put("/lavaderos/:id_lavadero", modificarLavadero);
router.delete("/lavaderos/:id_lavadero", eliminarLavadero);


module.exports = router;