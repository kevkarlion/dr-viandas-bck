const checkRole = (requiredRole) => {
      return (req, res, next) => {
        try {
          // Verifica si el usuario tiene el rol necesario
          if (req.user && req.user.role === requiredRole) {
            next(); // Continúa al siguiente middleware o controlador
          } else {
            res.status(403).json({ message: 'Acceso denegado: No tienes los permisos necesarios' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error en el servidor' });
        }
      };
    };
    
    module.exports = checkRole;
    