const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');

// Crear un nuevo pedido
router.post('/', orderController.createOrder);

// Obtener todos los pedidos
router.get('/', orderController.getAllOrders);

// Obtener un pedido por ID
router.get('/:id', orderController.getOrderById);

module.exports = router;
