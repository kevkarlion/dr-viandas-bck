const consultarPago = require("../services/consultarPago");
const Order = require("../models/OrderModel");

const handleWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;
    console.log("Webhook recibido:", type, data);

    if (type === "payment") {
      const paymentId = data.id;

      // Consultar detalles del pago en MercadoPago
      const paymentDetails = await consultarPago(paymentId);
      console.log("Detalles del pago:", paymentDetails);

      // Obtener el orderId desde la respuesta de pago (order.id)
      const orderId = paymentDetails.order?.id;
      if (!orderId) {
        console.error("No se encontró un orderId válido.");
        return res.status(400).json({ error: "No se encontró un orderId válido." });
      }

      // Verificar si la orden ya existe para evitar duplicados
      const existingOrder = await Order.findOne({ order_id: orderId });
      if (existingOrder) {
        console.log("⚠️ La orden ya existe, actualizando.");

        // Calcular el totalPrice desde los items
        const totalPrice = paymentDetails.additional_info.items.reduce(
          (acc, item) => acc + (parseFloat(item.unit_price) * parseInt(item.quantity, 10)),
          0
        );

        // Actualizar la orden existente con el nuevo estado
        await Order.updateOne(
          { order_id: orderId },
          {
            $set: {
              status: paymentDetails.status === "approved" ? "completed" : "pending",
              totalPrice: totalPrice, // Asignar el totalPrice calculado
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
              updatedAt: new Date(),
            }
          }
        );

        console.log("✅ Orden actualizada:", orderId);
        return res.status(200).send("OK");
      }

      // Calcular el totalPrice desde los items
      const totalPrice = paymentDetails.additional_info.items.reduce(
        (acc, item) => acc + (parseFloat(item.unit_price) * parseInt(item.quantity, 10)),
        0
      );

      // Crear una nueva orden con los detalles del pago
      const nuevaOrden = new Order({
        order_id: orderId, // Usar el order.id como identificador
        status: paymentDetails.status === "approved" ? "completed" : "pending",
        totalPrice: totalPrice, // Asignar el totalPrice calculado
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
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Guardar la nueva orden en la base de datos
      await nuevaOrden.save();
      console.log("✅ Nueva orden creada:", nuevaOrden);

      return res.status(200).send("OK");
    }

    res.status(200).send("Evento recibido");
  } catch (error) {
    console.error("❌ Error procesando el webhook:", error.message);
    res.status(500).send("Error interno del servidor.");
  }
};

module.exports = { handleWebhook };
