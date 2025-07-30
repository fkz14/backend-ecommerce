const fs = require('fs'); // Importa el módulo 'fs' para trabajar con el sistema de archivos.
const path = require('path'); // Importa el módulo 'path' para manejar rutas de archivos.

class ProductManager { // Define la clase ProductManager para gestionar productos.
  constructor() {
    // Define la ruta al archivo JSON donde se guardan los productos.
    this.path = path.join(__dirname, '../data/products.json');
  }

  _readFile() { // Método privado para leer el archivo de productos.
    if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, '[]'); // Si el archivo no existe, lo crea vacío.
    const data = fs.readFileSync(this.path, 'utf-8'); // Lee el contenido del archivo como texto.
    return JSON.parse(data); // Parsea el texto a un array de objetos y lo retorna.
  }

  _writeFile(data) { // Método privado para escribir en el archivo de productos.
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2)); // Escribe el array de productos en formato JSON, con identación.
  }

  getAll() { // Devuelve todos los productos.
    return this._readFile(); // Lee y retorna el array completo de productos.
  }

  getById(id) { // Devuelve un producto por su ID.
    return this._readFile().find(p => p.id == id); // Busca y retorna el producto cuyo id coincide.
  }

  addProduct(product) { // Agrega un nuevo producto.
    const products = this._readFile(); // Lee todos los productos actuales.
    const newProduct = {
      ...product, // Copia todas las propiedades del producto recibido.
      id: products.length ? products[products.length - 1].id + 1 : 1 // Asigna un ID autoincremental.
    };
    products.push(newProduct); // Agrega el nuevo producto al array.
    this._writeFile(products); // Guarda el array actualizado en el archivo.
    return newProduct; // Retorna el producto recién agregado.
  }

  updateProduct(id, updates) { // Actualiza un producto existente.
    const products = this._readFile(); // Lee todos los productos.
    const index = products.findIndex(p => p.id == id); // Busca el índice del producto a actualizar.
    if (index === -1) return null; // Si no existe, retorna null.

    products[index] = { ...products[index], ...updates, id: products[index].id }; // Mezcla los datos nuevos, sin modificar el ID.
    this._writeFile(products); // Guarda el array actualizado.
    return products[index]; // Retorna el producto actualizado.
  }

  deleteProduct(id) { // Elimina un producto por su ID.
    const products = this._readFile(); // Lee todos los productos.
    const filtered = products.filter(p => p.id != id); // Filtra el producto a eliminar.
    this._writeFile(filtered); // Guarda el array filtrado.
  }
}

module.exports = ProductManager; // Exporta la clase para usarla en otras partes de la aplicación.