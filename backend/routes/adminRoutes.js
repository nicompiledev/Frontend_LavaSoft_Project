const express = require('express');
const router = express.Router();

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
router.post("/registrar-lavadero", registrarLavadero);
router.get("/lavaderos", getLavederos);
router.get("/lavaderos/:id_lavadero", getLavadero);
router.put("/lavaderos/:id_lavadero", modificarLavadero);
router.delete("/lavaderos/:id_lavadero", eliminarLavadero);


module.exports = router;