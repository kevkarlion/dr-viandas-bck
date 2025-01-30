const Order = require("../models/OrderModel");

const actualizarOrder = async (orderId, updateData) => {
  try {
    if (!orderId || !updateData) {
      throw new Error("Se requiere el ID de la orden y los datos de actualización.");
    }

    // Buscar la orden en la base de datos por order_id
    let order = await Order.findOne({ order_id: orderId });

    if (order) {
      // ✅ Si la orden existe, actualizarla
      Object.assign(order, updateData);
      order.updatedAt = new Date();
      await order.save();
      console.log("✅ Orden actualizada correctamente:", order);
    } else {
      // 🆕 Si la orden no existe, crearla
      order = new Order({
        order_id: orderId,
        ...updateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await order.save();
      console.log("🆕 Nueva orden creada:", order);
    }

    return order;
  } catch (error) {
    console.error("❌ Error al procesar la orden:", error.message);
    throw new Error("No se pudo procesar la orden en la base de datos.");
  }
};

module.exports = actualizarOrder;
