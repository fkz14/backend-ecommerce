const fs = require('fs'); // Importa el módulo 'fs' para trabajar con archivos.
const path = require('path'); // Importa el módulo 'path' para manejar rutas de archivos.

class CartManager { // Define la clase CartManager para gestionar carritos.
  constructor() {
    // Define la ruta al archivo JSON donde se guardan los carritos.
    this.path = path.join(__dirname, '../data/carts.json');
  }

  _readFile() { // Método privado para leer el archivo de carritos.
    if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, '[]'); // Si el archivo no existe, lo crea vacío.
    return JSON.parse(fs.readFileSync(this.path, 'utf-8')); // Lee y parsea el archivo a un array de carritos.
  }

  _writeFile(data) { // Método privado para escribir en el archivo de carritos.
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2)); // Escribe el array de carritos en formato JSON con identación.
  }

  getCartById(id) { // Devuelve un carrito por su ID.
    return this._readFile().find(c => c.id == id); // Busca y retorna el carrito cuyo id coincide.
  }

  createCart() { // Crea un nuevo carrito vacío.
    const carts = this._readFile(); // Lee todos los carritos actuales.
    const newCart = {
      id: carts.length ? carts[carts.length - 1].id + 1 : 1, // Asigna un ID autoincremental.
      products: [] // Inicializa el carrito con un array vacío de productos.
    };
    carts.push(newCart); // Agrega el nuevo carrito al array.
    this._writeFile(carts); // Guarda el array actualizado en el archivo.
    return newCart; // Retorna el carrito recién creado.
  }

  addProductToCart(cartId, productId) { // Agrega un producto a un carrito.
    const carts = this._readFile(); // Lee todos los carritos.
    const cart = carts.find(c => c.id == cartId); // Busca el carrito por su ID.
    if (!cart) return null; // Si no existe el carrito, retorna null.

    const existingProduct = cart.products.find(p => p.product == productId); // Busca si el producto ya está en el carrito.
    if (existingProduct) {
      existingProduct.quantity++; // Si existe, incrementa la cantidad.
    } else {
      cart.products.push({ product: productId, quantity: 1 }); // Si no existe, lo agrega con cantidad 1.
    }

    this._writeFile(carts); // Guarda el array actualizado de carritos.
    return cart; // Retorna el carrito actualizado.
  }
}

module.exports = CartManager; // Exporta la clase para usarla en otras partes de la aplicación.