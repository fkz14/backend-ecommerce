// Importa la librería mongoose para manejar MongoDB desde Node.js
const mongoose = require('mongoose');

// Define un esquema para el carrito de compras
const cartSchema = new mongoose.Schema({
  // El carrito tendrá un array de productos
  products: [{
    // Cada elemento del array contiene un producto referenciado por su ID en la colección 'Product'
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    // La cantidad de ese producto en el carrito, por defecto es 1
    quantity: { type: Number, default: 1 }
  }]
});

// Exporta el modelo de Mongoose basado en el esquema 'cartSchema' con el nombre 'Cart'
// Esto permite crear, leer, actualizar y eliminar carritos en la base de datos
module.exports = mongoose.model('Cart', cartSchema);
