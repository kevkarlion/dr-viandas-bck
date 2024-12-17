// config/middleware.js o config/plugins.js

module.exports = {
      settings: {
        cors: {
          enabled: true,
          origin: ['http://localhost:3000', 'https://tu-frontend.com'], // Asegúrate de poner aquí las URLs correctas
        },
      },
    };
    