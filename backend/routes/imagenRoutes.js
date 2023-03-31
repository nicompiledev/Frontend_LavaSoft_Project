const express = require('express');
const router = express.Router();

const { 
  uploadSingle,
  uploadMultiple,
  getImages, } = require('../controllers/imagenController.js');


router.post('/upload', uploadSingle);
router.post('/upload-multiple', uploadMultiple);
router.get('/imagenes', getImages);


module.exports = router;