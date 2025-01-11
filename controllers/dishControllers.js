const Dish = require('../models/DishModel');

// Controlador para crear un nuevo platillo
const createDish = async (req, res) => {
  try {
    const { name, price, description, available, ingredients, photo } = req.body;

    const newDish = new Dish({
      name,
      price,
      description,
      available,
      ingredients,
      photo,
    });
    console.log('newDish', newDish);
    const savedDish = await newDish.save();
    res.status(201).json(savedDish); // Enviar el platillo creado
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener todos los platillos
const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find(); // Buscar todos los platillos
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDish,
  getDishes,
};
