
const { MercadoPagoConfig, Preference } = require('mercadopago');

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

const client = new MercadoPagoConfig({ accessToken: accessToken });

const preference = new Preference(client);

 const createPreference = async (body)=> {
  try{
    console.log('Items desde servicio:', body);
    const response = await preference.create( body )
    console.log('Respuesta de la creación de preferencia:', response);
    return { data: response };
   
  } catch(error)  {
      console.log('Respuesta del catch:', error);
    }
  }

module.exports = { createPreference };