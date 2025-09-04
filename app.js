const express = require('express');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const PORT = 8080;

const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');

// Conexión a MongoDB (sin opciones deprecated)
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
const io = new Server(server);

module.exports = { app, io };