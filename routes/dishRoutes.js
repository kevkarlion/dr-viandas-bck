// routes/dishRoutes.js

const express = require('express');
const router = express.Router();
const { createDish, getDishes } = require('../controllers/dishControllers'); // Importar controladores
const protect = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');


// Ruta para crear un nuevo platillo
router.post('/dish', protect, checkRole('chef'), createDish);

// Ruta para obtener todos los platillos
router.get('/dishes', getDishes);

module.exports = router;
