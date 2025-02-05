// models/dishModel.js

const mongoose = require('mongoose');

// Definir el esquema
const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // El nombre es obligatorio
  },
  price: {
    type: Number,
    required: true,  // El precio es obligatorio
  },
  description: {
    type: String,
    required: true,  // La descripción es obligatoria
  },
  date: {
    type: String,
    required: true,  // El nombre es obligatorio
  },
  available: {
    type: Boolean,
    default: true,  // Por defecto, la vianda está disponible
  },
  ingredients: {
    type: [String],  // Array de ingredientes
    required: true,  // Los ingredientes son obligatorios
  },
  photo: {
    type: String,  // Guardaremos la URL de la foto
    required: true,  // La foto es obligatoria
  },
}, {
  timestamps: true,  // Para que se añadan las fechas de creación y actualización
});

// Crear el modelo a partir del esquema
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
