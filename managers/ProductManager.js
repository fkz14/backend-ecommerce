// Importa fs para manejar archivos y path para rutas
const fs = require('fs');
const path = require('path');

// Clase para manejar la lógica de productos
class ProductManager {
  constructor() {
    // Define la ruta del archivo donde se guardan los productos
    this.path = path.join(__dirname, '../data/products.json');
  }

  // Método privado para leer el archivo de productos
  _readFile() {
    try {
      // Si el archivo no existe, lo crea vacío
      if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, '[]');
      // Lee el archivo y lo convierte a objeto
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer productos:', error);
      return [];
    }
  }

  // Método privado para escribir en el archivo de productos
  _writeFile(data) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al escribir productos:', error);
    }
  }

  // Devuelve todos los productos
  getAll() {
    try {
      return this._readFile();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
  }

  // Devuelve un producto por su ID
  getById(id) {
    try {
      return this._readFile().find(p => p.id == id);
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      return null;
    }
  }

  // Agrega un producto nuevo
  addProduct(product) {
    try {
      const products = this._readFile();
      // Genera un ID autoincremental
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

  // Actualiza un producto existente
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

  // Elimina un producto por su ID
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

// Exporta la clase para usarla en otros archivos
module.exports = ProductManager;