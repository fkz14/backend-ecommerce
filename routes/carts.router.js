const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

const cm = new CartManager();

router.post('/', (req, res) => {
  try {
    const newCart = cm.createCart();
    if (!newCart) return res.status(500).json({ error: 'No se pudo crear el carrito' });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

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

module.exports = router;