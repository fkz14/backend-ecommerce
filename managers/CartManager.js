// Importa fs para manejar archivos y path para rutas
const fs = require('fs');
const path = require('path');

// Clase para manejar la lógica de carritos
class CartManager {
  constructor() {
    // Define la ruta del archivo donde se guardan los carritos
    this.path = path.join(__dirname, '../data/carts.json');
  }

  // Método privado para leer el archivo de carritos
  _readFile() {
    try {
      // Si el archivo no existe, lo crea vacío
      if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, '[]');
      return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    } catch (error) {
      console.error('Error al leer carritos:', error);
      return [];
    }
  }

  // Método privado para escribir en el archivo de carritos
  _writeFile(data) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al escribir carritos:', error);
    }
  }

  // Devuelve un carrito por su ID
  getCartById(id) {
    try {
      return this._readFile().find(c => c.id == id);
    } catch (error) {
      console.error('Error al obtener carrito por ID:', error);
      return null;
    }
  }

  // Crea un carrito nuevo
  createCart() {
    try {
      const carts = this._readFile();
      // Genera un ID autoincremental
      const newCart = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products: []
      };
      carts.push(newCart);
      this._writeFile(carts);
      return newCart;
    } catch (error) {
      console.error('Error al crear carrito:', error);
      return null;
    }
  }

  // Agrega un producto a un carrito
  addProductToCart(cartId, productId) {
    try {
      const carts = this._readFile();
      const cart = carts.find(c => c.id == cartId);
      if (!cart) return null;
      // Si el producto ya existe en el carrito, incrementa la cantidad
      const existingProduct = cart.products.find(p => p.product == productId);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
      this._writeFile(carts);
      return cart;
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      return null;
    }
  }
}

// Exporta la clase para usarla en otros archivos
module.exports = CartManager;