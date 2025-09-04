// Importa Express para crear rutas
const express = require('express');
// Crea un router de Express para definir endpoints
const router = express.Router();
// Importa el modelo de Carrito (Cart) de Mongoose
const Cart = require('../models/Cart');

/* ===========================
   Crear un carrito vacío
   POST /api/carts
=========================== */
router.post('/', async (req, res) => {
  try {
    // Crea un carrito nuevo con un array de productos vacío
    const newCart = await Cart.create({ products: [] });
    // Devuelve el carrito creado con código 201
    res.status(201).json(newCart);
  } catch (error) {
    // Si hay error, devuelve 500 con mensaje
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/* ===========================
   Obtener un carrito por ID con populate
   GET /api/carts/:cid
=========================== */
router.get('/:cid', async (req, res) => {
  try {
    // Busca el carrito por ID y popula los detalles de los productos
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    // Si se encuentra el carrito, lo devuelve; si no, error 404
    cart
      ? res.json(cart)
      : res.status(404).json({ error: 'Carrito no encontrado' });
  } catch (error) {
    // Error interno
    res.status(500).json({ error: error.message });
  }
});

/* ===========================
   Agregar un producto al carrito
   POST /api/carts/:cid/product/:pid
=========================== */
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    // Busca el carrito
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    // Busca si el producto ya está en el carrito
    const prod = cart.products.find(p => p.product.toString() === req.params.pid);
    if (prod) prod.quantity++; // Si existe, aumenta cantidad
    else cart.products.push({ product: req.params.pid, quantity: 1 }); // Si no, agrega con cantidad 1

    // Guarda los cambios
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ===========================
   Eliminar un producto del carrito
   DELETE /api/carts/:cid/products/:pid
=========================== */
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    // Busca el carrito
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    // Filtra el producto que se desea eliminar
    cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ===========================
   Reemplazar todos los productos del carrito
   PUT /api/carts/:cid
=========================== */
router.put('/:cid', async (req, res) => {
  try {
    const { products } = req.body; // Se esperan productos en el body
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = products; // Reemplaza productos
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ===========================
   Actualizar cantidad de un producto
   PUT /api/carts/:cid/products/:pid
=========================== */
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { quantity } = req.body; // Se espera cantidad en el body
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    // Busca el producto dentro del carrito
    const prod = cart.products.find(p => p.product.toString() === req.params.pid);
    if (!prod) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });

    prod.quantity = quantity; // Actualiza cantidad
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ===========================
   Vaciar carrito completo
   DELETE /api/carts/:cid
=========================== */
router.delete('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = []; // Vacía el carrito
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exporta el router para usarlo en el servidor principal
module.exports = router;
