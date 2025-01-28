require('dotenv').config();
const axios = require("axios");


const accessToken = 'APP_USR-1714622871403882-012222-b5670185cd096cf9e2ced6901aec57c0-189139543'

console.log('acces token desde consultarPago', accessToken)



const consultarPago = async (paymentId) => {
  try {
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: accessToken,
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
