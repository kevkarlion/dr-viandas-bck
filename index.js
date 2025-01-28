require('dotenv').config();


const authRoutes = require('./routes/authRoutes');  // Importar las rutas de autenticación

const dishRoutes = require('./routes/dishRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// Middleware para procesar el cuerpo de la solicitud como JSON
app.use(express.json());
const cors = require('cors');
app.use(cors()); // Esto habilita CORS para todas las rutas



// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});



app.use('/api', dishRoutes);


app.use('/api/webhook', webhookRoutes)
app.use('/api/auth', authRoutes);  // Prefijo '/api/auth' para las rutas de login y signup
app.use('/api/dish', dishRoutes);  // Prefijo '/api/dish' para las rutas de platillos
app.use('/api/cart', cartRoutes);  // Prefijo '/api/cart' para las rutas de carrito
app.use('/api/payments', paymentRoutes); // Prefijo '/api' para las rutas de pagos

// Middleware de manejo de errores
app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Algo salió mal!');
    });
    

console.log('MONGO_URI:', process.env.MONGO_URI);

// Conexión a MongoDB Atlas
const connectDB = async () => {
      try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };


connectDB();

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
