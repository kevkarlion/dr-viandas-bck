const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Importa bcrypt para las funciones de hashing

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  role: {
    type: String,
    default: 'user', // Nuevo campo para roles (puedes usarlo más adelante si necesitas roles como admin, etc.)
  },
}, { timestamps: true }); // Agrega automáticamente `createdAt` y `updatedAt`

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si la contraseña no ha sido modificada, pasa al siguiente middleware
  this.password = await bcrypt.hash(this.password, 10); // Hashea la contraseña
  next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
