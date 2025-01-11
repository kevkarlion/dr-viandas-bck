// controllers/cartController.js
const Cart = require("../models/CartModel");
const Dish = require("../models/DishModel");

const { ObjectId } = require("mongodb");

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
  const { userId, dishId } = req.body;

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

  removeFromCart,
};
