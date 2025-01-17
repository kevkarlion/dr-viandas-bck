// controllers/cartController.js
const Cart = require("../models/CartModel");
const Dish = require("../models/DishModel");

const { ObjectId } = require("mongodb");


const createCart = async (req, res) => {
  const { userId, dishId, quantity } = req.body;

  try {
    // Validar userId y dishId como ObjectId válidos
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(dishId)) {
      return res.status(400).json({ message: 'IDs inválidos' });
    }

    const userObjectId = new ObjectId(userId);
    const dishObjectId = new ObjectId(dishId);

    // Buscar el platillo
    const dish = await Dish.findById(dishObjectId);
    if (!dish) {
      return res.status(404).json({ message: 'Platillo no encontrado' });
    }

    // Buscar si el carrito del usuario ya existe
    let cart = await Cart.findOne({ userId: userObjectId });

    if (!cart) {
      // Crear un nuevo carrito si no existe
      cart = new Cart({
        userId: userObjectId,
        items: [
          {
            dishId: dishObjectId,
            name: dish.name,
            quantity: quantity,
            price: dish.price,
          },
        ],
      });
    } else {
      // Si el carrito existe, verificar si el platillo ya está en el carrito
      const itemIndex = cart.items.findIndex((item) => item.dishId.equals(dishObjectId));

      if (itemIndex > -1) {
        // Si ya está en el carrito, actualizar la cantidad
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Si no está en el carrito, agregarlo
        cart.items.push({
          dishId: dishObjectId,
          name: dish.name,
          quantity: quantity,
          price: dish.price,
        });
      }
    }

    // Guardar los cambios en la base de datos
    await cart.save();

    res.status(200).json({
      message: 'Carrito actualizado exitosamente',
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al crear o actualizar el carrito',
      error: error.message,
    });
  }
};




// Obtener el carrito de un usuario
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el carrito" });
  }
};

// Actualizar la cantidad de un platillo en el carrito
const updateCartItemQuantity = async (req, res) => {
  const { userId, dishId, change } = req.body;
  console.log('userId', userId, 'dishId', dishId, 'change', change);

  try {
    // Buscar el carrito del usuario
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    console.log("soy cart desde db", cart);

    // Validar y crear ObjectId
    if (!ObjectId.isValid(dishId)) {
      return res.status(400).json({ message: "dishId no es válido" });
    }

    //busca un dishId (ObjectId) en la lista de platillos
    const objectId = ObjectId.createFromHexString(dishId);
    const itemIndex = cart.items.findIndex((item) =>
      item.dishId.equals(objectId)
    );

    if (itemIndex > -1) {
      // Si el platillo existe, actualizamos la cantidad
      cart.items[itemIndex].quantity += change;

      // Si la cantidad llega a 0 o menos, eliminamos el platillo del carrito
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res
        .status(404)
        .json({ message: "Platillo no encontrado en el carrito" });
    }

    // Guardar el carrito actualizado
    await cart.save();

    res.status(200).json({ message: "Cantidad actualizada", cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar la cantidad en el carrito" });
  }
};

// Eliminar un platillo del carrito
const removeFromCart = async (req, res) => {
  console.log('req.query:', req.query);
  const { userId, dishId } = req.query;


  console.log('userId:', userId, 'dishId', dishId)

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }




    // Validar el dishId antes de usarlo
    if (!ObjectId.isValid(dishId)) {
      return res.status(400).json({ message: 'dishId no es válido' });
    } 

    // Crear un ObjectId de forma segura
    const dishObjectId = ObjectId.createFromHexString(dishId);

    // Filtrar el item a eliminar
    cart.items = cart.items.filter((item) => !item.dishId.equals(dishObjectId));




    // Guardamos el carrito actualizado
    await cart.save();

    res.status(200).json({ message: "Platillo eliminado del carrito", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar del carrito" });
  }
};

module.exports = {
  getCart,
  updateCartItemQuantity,
  createCart,
  removeFromCart,
};
