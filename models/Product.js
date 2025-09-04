// Importamos la librería mongoose, que nos permite interactuar con MongoDB
const mongoose = require('mongoose');

// Importamos el plugin mongoose-paginate-v2, que sirve para agregar paginación a los modelos
const mongoosePaginate = require('mongoose-paginate-v2');

// Definimos el esquema (schema) para los productos
// Un esquema es como una "plantilla" que define la estructura que tendrán los documentos en la colección "products"
const productSchema = new mongoose.Schema({
  // Título del producto
  title: String,

  // Descripción del producto
  description: String,

  // Código único del producto (no puede repetirse en la base de datos)
  code: { type: String, unique: true },

  // Precio del producto
  price: Number,

  // Estado del producto (por defecto está activo = true)
  status: { type: Boolean, default: true },

  // Cantidad de unidades disponibles en stock
  stock: Number,

  // Categoría a la que pertenece el producto
  category: String,

  // Array de strings donde guardaremos URLs o rutas de imágenes del producto
  thumbnails: [String]
});

// Activamos el plugin de paginación sobre el esquema
// Esto permitirá hacer consultas con paginación fácilmente usando mongoose-paginate-v2
productSchema.plugin(mongoosePaginate);

// Exportamos el modelo "Product" basado en el esquema definido
// Este modelo será el que usemos para interactuar con la colección "products" en la base de datos
module.exports = mongoose.model('Product', productSchema);
