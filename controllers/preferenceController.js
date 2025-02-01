const { createPreference } = require('../services/mercadoPagoServices');
const { createOrder } = require('../controllers/orderControllers');

const createPayment = async (req, res) => {


  const { body} = req.body;

  
  // console.log('userId', req.body.metadata.userId)
  
  // console.log('items al servidor, userId', body.metadata.userId)
  
  // await createOrder(body.metadata.userId)
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
