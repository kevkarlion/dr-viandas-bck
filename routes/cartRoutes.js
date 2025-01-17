// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const  authMiddleware  = require('../middleware/authMiddleware'); // Middleware para verificar token
const cartController = require('../controllers/cartControllers'); // Importa el controlador

// Obtener el carrito de un usuario
// router.get('/:userId', authMiddleware, cartController.getCart);


// Ruta para crear o actualizar un carrito
router.post('/add', authMiddleware, cartController.createCart);

// Agregar un platillo al carrito
router.patch('/update', authMiddleware, cartController.updateCartItemQuantity);

// Eliminar un platillo del carrito
router.delete('/remove', authMiddleware, cartController.removeFromCart);

module.exports = router;
