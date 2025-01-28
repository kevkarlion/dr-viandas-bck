const Order = require("../models/OrderModel");

/**
 * Actualiza el estado de una orden en la base de datos
 * @param {string} orderId - ID de la orden en la base de datos
 * @param {object} updateData - Datos a actualizar
 * @returns {object} - La orden actualizada
 */
const actualizarOrder = async (orderId, updateData) => {
  try {
    // Validar datos requeridos
    if (!orderId || !updateData) {
      throw new Error("Se requiere el ID de la orden y los datos de actualización.");
    }

    // Actualizar la orden en la base de datos
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true, // Devuelve la orden actualizada
      runValidators: true, // Valida los datos al actualizar
    });

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
