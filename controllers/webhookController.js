const handleWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    // Verifica que las propiedades existan
    if (!type || !data) {
      console.error("Webhook recibido con datos incompletos:", req.body);
      return res.status(400).send("Datos incompletos");
    }

    if (type === 'payment') {
      console.log(`Pago recibido con ID: ${data.id}`);
      // Aquí podrías actualizar tu base de datos con el estado del pago.
      // Asegúrate de envolver esa operación en un try/catch si también puede fallar.
    }

    res.status(200).send('OK'); // Notifica a Mercado Pago que se recibió correctamente.
  } catch (error) {
    console.error("Error procesando el webhook:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { handleWebhook };
