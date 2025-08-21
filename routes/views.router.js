// Importa Express y crea el router
const express = require('express');
const router = express.Router();
// Importa el manager de productos para obtener la lista
const ProductManager = require('../managers/ProductManager');
const pm = new ProductManager();

// Ruta para la vista principal, muestra todos los productos
router.get('/', (req, res) => {
  const products = pm.getAll();
  res.render('home', { products });
});

// Ruta para la vista en tiempo real, solo renderiza la plantilla
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

// Exporta el router para usarlo en app.js
module.exports = router;