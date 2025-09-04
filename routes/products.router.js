// Importa Express para crear rutas
const express = require('express');
// Crea un router de Express para definir endpoints
const router = express.Router();
// Importa el modelo Product de Mongoose
const Product = require('../models/Product');

/* ===========================
   GET /api/products
   Listar productos con paginación, filtros y ordenamiento
=========================== */
router.get('/', async (req, res) => {
  try {
    // Obtiene parámetros de query: límite, página, orden y filtro
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = {};

    // Filtro: si query es 'available', filtra por productos activos
    // Si no, filtra por categoría
    if (query) {
      if (query === 'available') filter.status = true;
      else filter.category = query;
    }

    // Define opción de ordenamiento según precio asc o desc
    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    // Opciones de paginación
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
      lean: true // Devuelve objetos planos en vez de documentos Mongoose
    };

    // Ejecuta la paginación con filtros y opciones
    const result = await Product.paginate(filter, options);

    // Devuelve resultado con información de paginación
    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}` : null
    });
  } catch (error) {
    // Error interno del servidor
    res.status(500).json({ status: 'error', error: error.message });
  }
});

/* ===========================
   GET /api/products/:pid
   Obtener producto por ID
=========================== */
router.get('/:pid', async (req, res) => {
  try {
    // Busca producto por ID y devuelve un objeto plano
    const product = await Product.findById(req.params.pid).lean();
    product
      ? res.json(product) // Si existe, devuelve producto
      : res.status(404).json({ error: 'Producto no encontrado' }); // Si no, error 404
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/* ===========================
   POST /api/products
   Crear un nuevo producto
=========================== */
router.post('/', async (req, res) => {
  try {
    // Desestructura campos del body
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    // Valida que los campos obligatorios estén presentes
    if (!title || !description || !code || price == null || stock == null || !category) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crea el producto en la base de datos
    const newProduct = await Product.create({
      title,
      description,
      code,
      price,
      status: status !== undefined ? status : true, // Por defecto activo
      stock,
      category,
      thumbnails: thumbnails || [],
    });

    // Devuelve el producto creado con código 201
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/* ===========================
   PUT /api/products/:pid
   Actualizar producto por ID
=========================== */
router.put('/:pid', async (req, res) => {
  try {
    // Actualiza el producto con los datos del body y devuelve el nuevo documento
    const updated = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    updated
      ? res.json(updated) // Devuelve el producto actualizado
      : res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/* ===========================
   DELETE /api/products/:pid
   Eliminar producto por ID
=========================== */
router.delete('/:pid', async (req, res) => {
  try {
    // Elimina el producto de la base de datos
    const deleted = await Product.findByIdAndDelete(req.params.pid);
    deleted
      ? res.status(204).send() // Devuelve 204 No Content si se eliminó
      : res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Exporta el router para usarlo en el servidor principal
module.exports = router;
