const express = require('express'); // Importa el módulo Express para crear rutas.
const router = express.Router(); // Crea un nuevo router de Express para definir rutas específicas.
const CartManager = require('../managers/CartManager'); // Importa la clase CartManager para manejar carritos.

const cm = new CartManager(); // Instancia CartManager para usar sus métodos en las rutas.

// POST /api/carts - crear un carrito vacío
router.post('/', (req, res) => { // Define la ruta POST para crear un carrito vacío.
  const newCart = cm.createCart(); // Llama al método createCart() para crear un nuevo carrito.
  res.status(201).json(newCart); // Devuelve el carrito creado con status 201 (creado).
});

// GET /api/carts/:cid - obtener carrito por ID
router.get('/:cid', (req, res) => { // Define la ruta GET para obtener un carrito por su ID.
  const cart = cm.getCartById(req.params.cid); // Busca el carrito usando el ID recibido por parámetro.
  cart
    ? res.json(cart) // Si existe, responde con el carrito en JSON.
    : res.status(404).json({ error: 'Carrito no encontrado' }); // Si no existe, responde con error 404.
});

// POST /api/carts/:cid/product/:pid - agregar producto al carrito
router.post('/:cid/product/:pid', (req, res) => { // Define la ruta POST para agregar un producto a un carrito.
  const cid = req.params.cid; // Obtiene el ID del carrito desde los parámetros de la URL.
  const pid = req.params.pid; // Obtiene el ID del producto desde los parámetros de la URL.

  const updatedCart = cm.addProductToCart(cid, pid); // Llama al método para agregar el producto al carrito.
  updatedCart
    ? res.json(updatedCart) // Si lo encuentra y actualiza, responde con el carrito actualizado.
    : res.status(404).json({ error: 'Carrito no encontrado' }); // Si no existe el carrito, responde con error 404.
});

module.exports = router; // Exporta el router para usarlo en la aplicación principal.