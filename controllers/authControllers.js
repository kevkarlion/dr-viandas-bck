const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require('../models/CartModel');


const signup = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body; // Rol por defecto: 'user'

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  // Crear un nuevo usuario
  const user = new User({
    name,
    email,
    password,
    role, // Asignar el rol al usuario
  });

  // Guardar el usuario
  try {
    await user.save();
    
    // Crear el carrito vacío asociado al usuario recién creado
    const cart = new Cart({
      userId: user._id, // Vincular el carrito con el ID del usuario
      items: [], // Un carrito nuevo está vacío
      status: 'active' // Estado del carrito: 'active'
    });

    // Guardar el carrito en la base de datos
    await cart.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role }, // El payload puede contener el ID del usuario
      process.env.JWT_SECRET, // La clave secreta que usas para firmar el token
      { expiresIn: "1h" } // El token caduca después de 1 hora
    );

    // Incluir datos básicos del usuario junto con el token
    res.status(201).json({
      message: "Usuario registrado con éxito",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      cart: {
        id: cart._id, // Devolver el ID del carrito recién creado
        userId: cart.userId,
        status: cart.status,
        items: cart.items // Mostrar carrito vacío por el momento

      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};


    

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Verificar si la contraseña es correcta
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role, // Incluir el rol
      },
      process.env.JWT_SECRET, // La clave secreta que usas para firmar el token
      { expiresIn: "1h" } // El token caduca después de 1 hora
    );

    // Obtener la información del carrito asociado al usuario
    const cart = await Cart.findOne({ userId: user._id });
    console.log('cart',cart)
    // Formatear la respuesta del carrito (asegurar estructura consistente)
    const formattedCart = cart ? {
      id: cart._id,
      userId: cart.userId,
      status: cart.status,
      items: cart.items.map(item => ({
        dishId: item.dishId,
        quantity: item.quantity,
        price: item.price,
        name: item.name
      })),
      total: cart.total || 0,
    } : { items: [], total: 0 };

    // Incluir datos básicos del usuario y del carrito junto con el token
    res.status(200).json({
      message: "Inicio de sesión con éxito",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      cart: formattedCart, // Agregar carrito a la respuesta
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

module.exports = {
  signup,
  login,
};
