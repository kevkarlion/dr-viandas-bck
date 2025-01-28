const { createPreference } = require('../services/mercadoPagoServices');

const createPayment = async (req, res) => {


  const { body } = req.body;


  console.log('items al servidor', req.body)

  if (!body || !body.items || !body.items.length) {
    return res.status(400).json({ message: 'No se enviaron productos.' });
  }

  try {
    const data = await createPreference(req.body); // Llama a la función de creación de preferencia
    console.log('datos:', data);
    res.status(200).json({ data }); // Devuelve la URL para redirigir al usuario
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pago.', error });
  }
};

module.exports = {
  createPayment,
};
