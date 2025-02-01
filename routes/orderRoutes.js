const express = require('express');
const protect = require('../middleware/authMiddleware'); // Protege las rutas

const { getAllOrders, createOrder } = require('../controllers/orderControllers'); // Importar controladores
const router = express.Router();


// Ruta para obtener el carrito de compras
router.get('/cart', protect, getAllOrders );

// Ruta para hacer un pedido
router.post('/create', protect, createOrder);

module.exports = router;
