const axios = require("axios");

const consultarPago = async (paymentId) => {
  try {
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer TU_ACCESS_TOKEN`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al consultar el pago:", error.response?.data || error.message);
    throw new Error("No se pudo consultar el pago");
  }
};

module.exports = consultarPago;
