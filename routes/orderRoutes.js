const express = require('express');
const protect = require('../middleware/authMiddleware'); // Protege las rutas

const { getCart, createOrder } = require('../controllers/orderControllers'); // Importar controladores
const router = express.Router();


// Ruta para obtener el carrito de compras
router.get('/cart', protect, getCart);

// Ruta para hacer un pedido
router.post('/order', protect, createOrder);

module.exports = router;
