const Order = require('../models/Order');

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;

    // Validar que los datos básicos estén presentes
    if (!userId || !items || items.length === 0 || !totalPrice) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Crear un nuevo pedido
    const newOrder = new Order({
      userId,
      items,
      totalPrice,
    });

    // Guardar el pedido en la base de datos
    const savedOrder = await newOrder.save();

    return res.status(201).json({
      message: 'Pedido registrado con éxito',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los pedidos (opcional para gestión)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('items.dishId');
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un pedido por ID
exports.getOrderById = async (req, res) => {
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
