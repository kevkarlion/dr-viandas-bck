const mongoose = require('mongoose');

// Esquema del carrito
const cartSchema = new mongoose.Schema({
  // Asociación al usuario
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Se refiere al modelo de 'User'
    required: true 
  },
  
  // Lista de items en el carrito (productos que el usuario ha agregado)
  items: [
    {
      dishId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Dish', // Se refiere al modelo de 'Dish' (productos del menú)
        required: true 
      },
      name: { 
        type: String,
        required: true
      }, // Agregamos el nombre del plato
      quantity: { 
        type: Number, 
        required: true,
        min: 1 // No puedes agregar menos de 1 de un platillo
      },
      price: { 
        type: Number, // Guardar el precio del plato al momento de agregarlo
        required: true 
      }
    }
  ],

  // Estado del carrito (puede ser activo o pagado, por ejemplo)
  status: { 
    type: String, 
    default: 'active', // El carrito está por defecto como activo
    enum: ['active', 'paid', 'cancelled'], // Posibles valores
  },

  // Fecha de creación del carrito (para tener control sobre el tiempo)
  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  // Fecha de actualización del carrito
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Crear el modelo para el carrito
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
