const Order = require('../models/Order');

// Controlador para obtener el carrito de compras
const getCart = (req, res) => {
  const userId = req.user._id; // El id del usuario viene del token
  // Aquí puedes implementar lógica adicional si necesitas datos específicos
  res.json({ message: 'Carrito de compras', userId });
};

// Controlador para hacer un pedido
const createOrder = async (req, res) => {
  const userId = req.user._id; // El id del usuario viene del token
  const { items, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      status: 'pendiente',
    });
    await newOrder.save();
    res.status(201).json({ message: 'Pedido realizado con éxito', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido', error });
  }
};

module.exports = {
  getCart,
  createOrder,
};
