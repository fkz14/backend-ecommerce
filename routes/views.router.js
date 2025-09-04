// Importa Express para crear rutas
const express = require('express');
// Crea un router de Express para definir endpoints
const router = express.Router();
// Importa el modelo Product de Mongoose
const Product = require('../models/Product');
// Importa el modelo Cart de Mongoose
const Cart = require('../models/Cart');

/* ===========================
   GET /products
   Renderiza vista de productos paginados
=========================== */
router.get('/products', async (req, res) => {
  // Obtiene parámetros de query: límite, página, orden y filtro
  const { limit = 10, page = 1, sort, query } = req.query;
  const filter = {};
  // Aplica filtro por disponibilidad o categoría
  if (query) {
    if (query === 'available') filter.status = true;
    else filter.category = query;
  }

  // Define ordenamiento por precio asc o desc
  const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
  // Opciones de paginación
  const options = { page: parseInt(page), limit: parseInt(limit), sort: sortOption, lean: true };
  // Ejecuta paginación
  const result = await Product.paginate(filter, options);

  // Buscar o crear un carrito para el usuario (para demo, usa el primero o crea uno)
  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ products: [] });
  const cartId = cart._id.toString();

  // Renderiza la vista 'index' con productos y datos de paginación
  res.render('index', {
    products: result.docs,
    totalPages: result.totalPages,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    cartId // <-- PASA EL ID REAL DEL CARRITO
  });
});

/* ===========================
   GET /products/:pid
   Renderiza detalle de un producto
=========================== */
router.get('/products/:pid', async (req, res) => {
  // Busca producto por ID
  const product = await Product.findById(req.params.pid).lean();
  if (!product) return res.status(404).send('Producto no encontrado');

  // Buscar o crear un carrito para el usuario
  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ products: [] });
  const cartId = cart._id.toString();

  // Renderiza la vista 'productDetail' con datos del producto y del carrito
  res.render('productDetail', { product, cartId });
});

/* ===========================
   GET /carts/:cid
   Renderiza vista del carrito
=========================== */
router.get('/carts/:cid', async (req, res) => {
  // Busca carrito por ID y popula los productos
  const cart = await Cart.findById(req.params.cid).populate('products.product').lean();
  if (!cart) return res.status(404).send('Carrito no encontrado');

  // Renderiza la vista 'cartDetail' con los datos del carrito
  res.render('cartDetail', { cart });
});

// Exporta el router para usarlo en el servidor principal
module.exports = router;
