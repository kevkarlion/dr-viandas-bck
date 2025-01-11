const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); // Importar el middleware de seguridad

// Ruta protegida para obtener el perfil de usuario
router.get('/profile', protect, (req, res) => {
  // El middleware protege esta ruta, por lo que si el token es válido, llega aquí
  res.json({ message: 'Perfil de usuario', user: req.user }); // `req.user` tiene la información decodificada del token
});

module.exports = router;
