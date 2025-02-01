const Order = require("../models/OrderModel");
const User = require("../models/User");

// Crear un nuevo pedido vinculando con el usuario
const createOrder = async (userId) => {
  try {
    // Validar que `userId` esté presente
    if (!userId) {
      throw new Error("El userId es requerido");
    }

    // Buscar el usuario en la base de datos
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    
    // Crear una nueva orden con `order_id` y `userId`
    const newOrder = new Order({
      userId
    });

    // Guardar el pedido en la base de datos
    const savedOrder = await newOrder.save();

    return savedOrder; // Devuelve la orden creada
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw error; // Lanza el error para manejarlo en `createPayment`
  }
};



// Obtener todos los pedidos (opcional para gestión)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('items.dishId');
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un pedido por ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('userId', 'name email').populate('items.dishId');
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = { createOrder, getAllOrders, getOrderById }