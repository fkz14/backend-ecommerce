// Importa Express para crear el servidor
const express = require('express');
// Importa Server de socket.io para comunicación en tiempo real
const { Server } = require('socket.io');
// Importa express-handlebars para usar plantillas Handlebars
const exphbs = require('express-handlebars');
// Importa path para manejar rutas de archivos
const path = require('path');

// Crea la aplicación Express
const app = express();
// Define el puerto donde se ejecutará el servidor
const PORT = 8080;

// Importa los routers para productos, carritos y vistas
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');

// Importa el manager de productos para manejar la lógica de productos
const ProductManager = require('./managers/ProductManager');
const pm = new ProductManager();

// Configura los middlewares para recibir datos en formato JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Sirve archivos estáticos desde la carpeta public (como CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Configura Handlebars como motor de plantillas
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Usa los routers para manejar las rutas de la API y las vistas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Inicia el servidor HTTP en el puerto definido
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
// Inicializa Socket.io sobre el servidor HTTP
const io = new Server(server);

// Configura los eventos de WebSocket
io.on('connection', socket => {
  console.log('Cliente conectado');

  // Envía la lista de productos al cliente cuando se conecta
  socket.emit('products', pm.getAll());

  // Recibe evento para agregar producto desde el cliente y actualiza la lista
  socket.on('addProduct', data => {
    pm.addProduct(data);
    io.emit('products', pm.getAll());
  });

  // Recibe evento para eliminar producto y actualiza la lista
  socket.on('deleteProduct', id => {
    pm.deleteProduct(id);
    io.emit('products', pm.getAll());
  });
});

// Exporta la app y el objeto io para usarlos en otros archivos si es necesario
module.exports = { app, io };