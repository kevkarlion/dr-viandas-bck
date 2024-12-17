module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // De nuevo, no se incluye la URL porque no se tiene aún
          'connect-src': ["'self'"], // Solo permite las conexiones al mismo origen por ahora
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      // Permite solicitudes desde tu frontend local mientras desarrollas
      origin: ['http://localhost:3000'], // Reemplázalo después con la URL de tu despliegue
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
