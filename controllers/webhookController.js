const consultarPago = require("../services/consultarPago");
const actualizarOrder = require("../controllers/actualizarOrder");

const handleWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;
    
    console.log("Webhook recibido:", type, data);

    if (type === "payment") {
      const paymentId = data.id;

      // Consultar detalles del pago
      const paymentDetails = await consultarPago(paymentId);
      console.log("Detalles del pago:", paymentDetails);

      // Obtener ID de la orden desde la respuesta (en lugar de external_reference)
      const orderId = paymentDetails.order?.id; 
      if (!orderId) {
        console.error("No se encontró un orderId válido en la respuesta del pago.");
        return res.status(400).json({ error: "No se encontró un orderId válido." });
      }
      
      // Preparar los datos a actualizar en la orden
      const updateData = {
        status: paymentDetails.status === "approved" ? "completed" : "pending",
        paymentDetails: {
          id: paymentId,
          status: paymentDetails.status,
          method: paymentDetails.payment_method_id,
          transactionAmount: paymentDetails.transaction_amount,
          dateApproved: paymentDetails.date_approved,
        },
        payer: {
          email: paymentDetails.payer?.email || "No especificado",
          id: paymentDetails.payer?.id || "No especificado",
          identification: paymentDetails.payer?.identification || {},
        },
        items: paymentDetails.additional_info.items.map(item => ({
          name: item.title,
          quantity: parseInt(item.quantity, 10),
          price: parseFloat(item.unit_price),
        })),
        updatedAt: new Date(),
      };

      // Actualizar la orden en la base de datos
      const updatedOrder = await actualizarOrder(orderId, updateData);
      console.log("Orden actualizada:", updatedOrder);

      return res.status(200).send("OK");
    }

    res.status(200).send("Evento recibido");
  } catch (error) {
    console.error("Error procesando el webhook:", error.message);
    res.status(500).send("Error interno del servidor.");
  }
};

module.exports = { handleWebhook };
