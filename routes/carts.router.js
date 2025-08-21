// Importa Express y crea el router
const express = require('express');
const router = express.Router();
// Importa el manager de carritos
const CartManager = require('../managers/CartManager');
const cm = new CartManager();

// Ruta para crear un carrito nuevo
router.post('/', (req, res) => {
  try {
    const newCart = cm.createCart();
    if (!newCart) return res.status(500).json({ error: 'No se pudo crear el carrito' });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener los productos de un carrito
router.get('/:cid', (req, res) => {
  try {
    const cart = cm.getCartById(req.params.cid);
    cart
      ? res.json(cart)
      : res.status(404).json({ error: 'Carrito no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const updatedCart = cm.addProductToCart(cid, pid);
    updatedCart
      ? res.json(updatedCart)
      : res.status(404).json({ error: 'Carrito no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Exporta el router para usarlo en app.js
module.exports = router;