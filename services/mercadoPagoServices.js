
const { MercadoPagoConfig, Preference } = require('mercadopago');

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

const client = new MercadoPagoConfig({ accessToken: accessToken });

const preference = new Preference(client);

 const createPreference = async (items)=> {
  try{
    console.log('Items desde servicio:', items);
   const response = await preference.create({
      body: { items }
    })
    
    console.log('Respuesta de la creación de preferencia:', response);
    return {
      id: response.id,
      init_point: response.init_point, // URL para redirigir al usuario a MercadoPago
      items: response.items,
      total_amount: response.items.reduce(
        (total, item) => total + item.unit_price * item.quantity,
        0
      ),
    };
   
  } catch(error)  {
      console.log('Respuesta del catch:', error);
    }
  }

module.exports = { createPreference };