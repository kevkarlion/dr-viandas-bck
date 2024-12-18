module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('ADMIN_URL', '/admin'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // Configuración de HTTPS (si aplicable)
  https: {
    key: env('SSL_KEY_PATH'),
    cert: env('SSL_CERT_PATH'),
  },
});
