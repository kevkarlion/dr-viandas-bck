const { createPreference } = require('../services/mercadoPagoServices');

const createPayment = async (req, res) => {
  const { items } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ message: 'No se enviaron productos.' });
  }

  try {
    const initPoint = await createPreference(items); // Llama a la función de creación de preferencia
    console.log('initPoint:', initPoint);
    res.status(200).json({ initPoint }); // Devuelve la URL para redirigir al usuario
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pago.', error });
  }
};

module.exports = {
  createPayment,
};
