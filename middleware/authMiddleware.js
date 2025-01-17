const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT en las rutas protegidas
const protect = (req, res, next) => {
  console.log('ruta de validacion de token')
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No se ha proporcionado un token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    req.user = decoded; // Adjuntar la información del usuario a la request
    next(); // Continuar con la siguiente función de middleware o ruta
  } catch (error) {
    res.status(401).json({ message: 'Token no válido o expirado' });
  }
};

module.exports = protect;
