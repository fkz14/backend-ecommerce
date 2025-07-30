const express = require('express'); // Importa el módulo Express para crear rutas.
const router = express.Router(); // Crea un nuevo router de Express para definir rutas específicas.
const ProductManager = require('../managers/ProductManager'); // Importa la clase ProductManager para manejar productos.

const pm = new ProductManager(); // Instancia ProductManager para usar sus métodos en las rutas.

// GET /api/products - obtener todos
router.get('/', (req, res) => { // Define la ruta GET para obtener todos los productos.
  const products = pm.getAll(); // Llama al método getAll() para traer todos los productos.
  res.json(products); // Devuelve la lista de productos en formato JSON.
});

// GET /api/products/:pid - obtener uno por ID
router.get('/:pid', (req, res) => { // Define la ruta GET para obtener un producto por su ID.
  const product = pm.getById(req.params.pid); // Busca el producto usando el ID recibido por parámetro.
  product
    ? res.json(product) // Si existe, responde con el producto en JSON.
    : res.status(404).json({ error: 'Producto no encontrado' }); // Si no existe, responde con error 404.
});

// POST /api/products - agregar nuevo producto
router.post('/', (req, res) => { // Define la ruta POST para agregar un nuevo producto.
  // Extrae los campos del cuerpo de la petición.
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  // Valida que los campos obligatorios estén presentes.
  if (!title || !description || !code || price == null || stock == null || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' }); // Si falta alguno, responde con error 400.
  }

  // Crea el nuevo producto usando los datos recibidos.
  const newProduct = pm.addProduct({
    title,
    description,
    code,
    price,
    status: status !== undefined ? status : true, // Si no se envía status, lo pone en true por defecto.
    stock,
    category,
    thumbnails: thumbnails || [], // Si no se envían thumbnails, usa un array vacío.
  });

  res.status(201).json(newProduct); // Devuelve el producto creado con status 201 (creado).
});

// PUT /api/products/:pid - actualizar producto
router.put('/:pid', (req, res) => { // Define la ruta PUT para actualizar un producto por ID.
  const updated = pm.updateProduct(req.params.pid, req.body); // Intenta actualizar el producto con los datos recibidos.
  updated
    ? res.json(updated) // Si lo encuentra y actualiza, responde con el producto actualizado.
    : res.status(404).json({ error: 'Producto no encontrado' }); // Si no existe, responde con error 404.
});

// DELETE /api/products/:pid - eliminar producto
router.delete('/:pid', (req, res) => { // Define la ruta DELETE para eliminar un producto por ID.
  const exists = pm.getById(req.params.pid); // Verifica si el producto existe.
  if (!exists) return res.status(404).json({ error: 'Producto no encontrado' }); // Si no existe, responde con error 404.

  pm.deleteProduct(req.params.pid); // Si existe, lo elimina.
  res.status(204).send(); // Responde con status 204 (sin contenido) indicando que se eliminó correctamente.
});

module.exports = router; // Exporta el router para usarlo en la aplicación principal.