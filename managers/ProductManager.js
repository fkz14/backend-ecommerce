const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, '../data/products.json');
  }

  _readFile() {
    try {
      if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, '[]');
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer productos:', error);
      return [];
    }
  }

  _writeFile(data) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al escribir productos:', error);
    }
  }

  getAll() {
    try {
      return this._readFile();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
  }

  getById(id) {
    try {
      return this._readFile().find(p => p.id == id);
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      return null;
    }
  }

  addProduct(product) {
    try {
      const products = this._readFile();
      const newProduct = {
        ...product,
        id: products.length ? products[products.length - 1].id + 1 : 1
      };
      products.push(newProduct);
      this._writeFile(products);
      return newProduct;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      return null;
    }
  }

  updateProduct(id, updates) {
    try {
      const products = this._readFile();
      const index = products.findIndex(p => p.id == id);
      if (index === -1) return null;
      products[index] = { ...products[index], ...updates, id: products[index].id };
      this._writeFile(products);
      return products[index];
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      return null;
    }
  }

  deleteProduct(id) {
    try {
      const products = this._readFile();
      const filtered = products.filter(p => p.id != id);
      this._writeFile(filtered);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  }
}

module.exports = ProductManager;