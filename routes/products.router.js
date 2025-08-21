// Importa Express y crea el router
const express = require('express');
const router = express.Router();
// Importa el manager de productos
const ProductManager = require('../managers/ProductManager');
const pm = new ProductManager();

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
  try {
    const products = pm.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener un producto por su ID
router.get('/:pid', (req, res) => {
  try {
    const product = pm.getById(req.params.pid);
    product
      ? res.json(product)
      : res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un producto nuevo
router.post('/', (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || price == null || stock == null || !category) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const newProduct = pm.addProduct({
      title,
      description,
      code,
      price,
      status: status !== undefined ? status : true,
      stock,
      category,
      thumbnails: thumbnails || [],
    });
    if (!newProduct) return res.status(500).json({ error: 'No se pudo crear el producto' });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar un producto existente
router.put('/:pid', (req, res) => {
  try {
    const updated = pm.updateProduct(req.params.pid, req.body);
    updated
      ? res.json(updated)
      : res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', (req, res) => {
  try {
    const exists = pm.getById(req.params.pid);
    if (!exists) return res.status(404).json({ error: 'Producto no encontrado' });
    pm.deleteProduct(req.params.pid);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Exporta el router para usarlo en app.js
module.exports = router;