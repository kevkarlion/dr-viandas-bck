export default ({ env }) => ({
  connection: {
    client: 'mongo', // Cliente para MongoDB
    connection: {
      uri: env('DATABASE_URI'), // URI para MongoDB Atlas
      options: {
        ssl: true, // Conexión segura
      },
    },
  },
});
