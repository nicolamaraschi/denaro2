// src/controllers/categoryController.js
const Category = require('../models/Category');

// Ottieni tutte le categorie
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.userId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Aggiungi una categoria
exports.addCategory = async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user.userId; // Ottieni l'ID dell'utente dal token

  const category = new Category({
    name,
    type,
    userId  // Aggiungi l'ID dell'utente alla categoria
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Elimina una categoria
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await Category.deleteOne({ _id: req.params.id });  // Usa deleteOne() invece di remove()
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { name, type } = req.body;

  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Aggiorna i campi della categoria
    category.name = name || category.name;
    category.type = type || category.type;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
