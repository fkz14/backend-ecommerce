// 1. Importa el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const express = require('express');

// 2. Crea una instancia de la aplicación Express.
const app = express();

// 3. Define el puerto en el que el servidor escuchará las peticiones (8080).
const PORT = 8080;

// 4. Importa el router de productos desde el archivo correspondiente.
const productsRouter = require('./routes/products.router');

// 5. Importa el router de carritos desde el archivo correspondiente.
const cartsRouter = require('./routes/carts.router');

// 6. Middleware de Express para analizar (parsear) el cuerpo de las peticiones con formato JSON.
app.use(express.json());

// 7. Usa el router de productos para todas las rutas que comiencen con '/api/products'.
app.use('/api/products', productsRouter);

// 8. Usa el router de carritos para todas las rutas que comiencen con '/api/carts'.
app.use('/api/carts', cartsRouter);

// 9. Inicia el servidor y lo pone a escuchar en el puerto definido. 
//    Cuando el servidor está listo, imprime un mensaje en la consola.
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});