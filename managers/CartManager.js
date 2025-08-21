const fs = require('fs');
const path = require('path');

class CartManager {
  constructor() {
    this.path = path.join(__dirname, '../data/carts.json');
  }

  _readFile() {
    try {
      if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, '[]');
      return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    } catch (error) {
      console.error('Error al leer carritos:', error);
      return [];
    }
  }

  _writeFile(data) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al escribir carritos:', error);
    }
  }

  getCartById(id) {
    try {
      return this._readFile().find(c => c.id == id);
    } catch (error) {
      console.error('Error al obtener carrito por ID:', error);
      return null;
    }
  }

  createCart() {
    try {
      const carts = this._readFile();
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

  addProductToCart(cartId, productId) {
    try {
      const carts = this._readFile();
      const cart = carts.find(c => c.id == cartId);
      if (!cart) return null;
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

module.exports = CartManager;