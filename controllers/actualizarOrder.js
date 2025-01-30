const Order = require("../models/OrderModel");

const actualizarOrder = async (orderId, updateData) => {
  try {
    if (!orderId || !updateData) {
      throw new Error("Se requiere el ID de la orden y los datos de actualización.");
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId }, // Buscar por ID de la orden
      { $set: updateData }, // Actualizar datos
      { new: true, runValidators: true } // Retornar el documento actualizado
    );

    if (!updatedOrder) {
      throw new Error(`No se encontró la orden con ID: ${orderId}`);
    }

    console.log("Orden actualizada correctamente:", updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.error("Error al actualizar la orden:", error.message);
    throw new Error("No se pudo actualizar la orden en la base de datos.");
  }
};

module.exports = actualizarOrder;
