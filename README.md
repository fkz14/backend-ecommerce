# Backend Ecommerce API - Gestión de Productos y Carritos 🛒

Este proyecto es un servidor backend desarrollado con Node.js, Express y MongoDB para gestionar productos y carritos de compra. Incluye vistas dinámicas con Handlebars y una interfaz visual moderna y atractiva.

---

## ✨ Características principales

- 📦 **Gestión completa de productos:** Crear, listar, actualizar y eliminar productos con campos como título, descripción, código, precio, stock, categoría y más.
- 🛒 **Manejo avanzado de carritos:** Crear carritos, listar sus productos, agregar productos, actualizar cantidades, eliminar productos y vaciar el carrito.
- 💾 **Persistencia profesional:** Los datos se guardan en MongoDB usando Mongoose y paginación avanzada.
- 🚀 **Servidor Express robusto:** Endpoints claros y organizados bajo rutas `/api/products` y `/api/carts`.
- 🖥️ **Vistas con Handlebars:** Interfaz visual para ver productos, detalle de producto y carrito, con paginación y filtros.
- 🎨 **Frontend elegante y dinámico:** Operaciones intuitivas, recuadros atractivos, botones modernos y actualización sin recargar la página.
- 🔄 **Actualización en tiempo real (opcional):** Vista `/realtimeproducts` con Socket.io para productos en tiempo real.

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose + mongoose-paginate-v2
- Express-Handlebars
- Socket.io (solo para vista en tiempo real)
- CSS moderno

---

## 📂 Estructura principal del proyecto

```
/
├── app.js                  # Archivo principal que levanta el servidor y configura rutas
├── models/
│   ├── Product.js          # Modelo Mongoose para productos
│   └── Cart.js             # Modelo Mongoose para carritos
├── routes/
│   ├── products.router.js  # Endpoints para productos
│   ├── carts.router.js     # Endpoints para carritos
│   └── views.router.js     # Endpoints para vistas Handlebars
├── views/
│   ├── index.handlebars            # Vista principal con productos y carrito
│   ├── productDetail.handlebars    # Vista de detalle de producto
│   ├── cartDetail.handlebars       # Vista de carrito específico
│   ├── realTimeProducts.handlebars # Vista con productos en tiempo real (Socket.io)
│   └── layouts/
│       └── main.handlebars         # Layout principal para Handlebars
├── public/
│   ├── styles.css          # Estilos para las vistas
│   └── main.js             # Lógica dinámica del frontend
├── managers/               # (Legacy, no se usa con MongoDB)
│   ├── ProductManager.js
│   └── CartManager.js
├── package.json            # Dependencias y scripts
└── .gitignore              # Ignora node_modules
```

---

## 🚦 Endpoints Disponibles

### Productos (`/api/products`)
| Método | Ruta                  | Descripción                              |
|--------|-----------------------|------------------------------------------|
| GET    | /api/products         | Listar productos con paginación, filtros y ordenamiento (`limit`, `page`, `sort`, `query`) |
| GET    | /api/products/:pid    | Obtener producto por ID                  |
| POST   | /api/products         | Crear un producto nuevo                  |
| PUT    | /api/products/:pid    | Actualizar producto                      |
| DELETE | /api/products/:pid    | Eliminar producto por ID                 |

### Carritos (`/api/carts`)
| Método | Ruta                                 | Descripción                                         |
|--------|--------------------------------------|-----------------------------------------------------|
| POST   | /api/carts                           | Crear un carrito nuevo                              |
| GET    | /api/carts/:cid                      | Listar productos del carrito (con populate)         |
| POST   | /api/carts/:cid/product/:pid         | Agregar producto al carrito (incrementa cantidad si existe) |
| DELETE | /api/carts/:cid/products/:pid        | Eliminar producto específico del carrito            |
| PUT    | /api/carts/:cid                      | Actualizar todos los productos del carrito con un arreglo |
| PUT    | /api/carts/:cid/products/:pid        | Actualizar solo la cantidad de un producto en el carrito |
| DELETE | /api/carts/:cid                      | Vaciar el carrito                                   |

---

## 🖥️ Vistas disponibles

- `/products`  
  Muestra la lista de productos con paginación, filtros y botones para operar (agregar, editar, eliminar, detalle, agregar al carrito). El carrito se muestra y opera en la misma página.

- `/products/:pid`  
  Vista de detalle de producto con botón para agregar al carrito.

- `/carts/:cid`  
  Vista de carrito específico, mostrando solo los productos de ese carrito.

- `/realtimeproducts`  
  Vista de productos en tiempo real (Socket.io).

---

## 🚀 ¿Cómo probar el proyecto?

1. Instala dependencias:
   ```
   npm install
   ```
2. Inicia el servidor:
   ```
   node app.js
   ```
3. Abre en tu navegador:
   - [http://localhost:8080/products](http://localhost:8080/products) para la vista principal.
