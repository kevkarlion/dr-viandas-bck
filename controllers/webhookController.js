const consultarPago = require("../services/consultarPago");
const actualizarOrder = require("../controllers/actualizarOrder");

const handleWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    console.log('req body',req.body)
    console.log('data id recibido',data.id)

    console.log("Webhook recibido:", type, data);

    if (type === "payment") {
      const paymentId = data.id;

      // Consulta los detalles del pago desde Mercado Pago
      const paymentDetails = await consultarPago(paymentId);

      // Obtén el ID de la orden desde el campo 'external_reference'
      const orderId = paymentDetails.external_reference;

      // Prepara los datos para actualizar la orden
      const updateData = {
        status: paymentDetails.status === "approved" ? "completed" : "pending",
        paymentDetails: {
          id: paymentId,
          status: paymentDetails.status,
          method: paymentDetails.payment_method_id,
          transactionAmount: paymentDetails.transaction_amount,
          dateApproved: paymentDetails.date_approved,
        },
        updatedAt: new Date(),
      };

      // Actualiza la orden en la base de datos
      const updatedOrder = await actualizarOrder(orderId, updateData);

      console.log("Orden actualizada tras el pago:", updatedOrder);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error procesando el webhook:", error.message);
    res.status(500).send("Error interno del servidor.");
  }
};

module.exports = { handleWebhook };
