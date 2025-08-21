const express = require('express');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 8080;

// Routers
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');

// Managers
const ProductManager = require('./managers/ProductManager');
const pm = new ProductManager();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars config
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Servidor HTTP y Socket.io
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
const io = new Server(server);

// WebSocket: conexión y eventos
io.on('connection', socket => {
  console.log('Cliente conectado');

  // Enviar productos al conectar
  socket.emit('products', pm.getAll());

  // Crear producto desde websocket
  socket.on('addProduct', data => {
    pm.addProduct(data);
    io.emit('products', pm.getAll());
  });

  // Eliminar producto desde websocket
  socket.on('deleteProduct', id => {
    pm.deleteProduct(id);
    io.emit('products', pm.getAll());
  });
});

// Exportar io para usar en rutas si lo necesitas
module.exports = { app, io };