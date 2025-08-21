# Backend API - Gestión de Productos y Carritos 🛠️

Este proyecto es un servidor backend desarrollado con Node.js y Express para gestionar productos y carritos de compra. Ahora incluye vistas dinámicas con Handlebars y actualización en tiempo real de productos usando WebSockets (Socket.io).

---

## ✨ Características principales

- 📦 **Gestión completa de productos:** Crear, listar, actualizar y eliminar productos con campos como título, descripción, código, precio, stock, categoría y más.
- 🛒 **Manejo de carritos de compra:** Crear carritos, listar sus productos y agregar productos a un carrito, incrementando cantidad si ya existe.
- 💾 **Persistencia sencilla:** Los datos se guardan en archivos JSON (`products.json` y `carts.json`), simulando una base de datos básica.
- 🚀 **Servidor Express robusto:** Endpoints claros y organizados bajo rutas `/api/products` y `/api/carts`.
- 🧰 **Preparado para integrarse con cualquier cliente REST:** Postman, frontends, etc.
- 🖥️ **Vistas con Handlebars:** Interfaz visual para ver productos y carritos.
- 🔄 **Actualización en tiempo real:** La vista `/realtimeproducts` se actualiza automáticamente al agregar o eliminar productos usando WebSocket.

---

## 🛠️ Tecnologías utilizadas

- Node.js: Entorno de ejecución JavaScript en backend.
- Express: Framework para crear servidores y manejar rutas HTTP.
- Express-Handlebars: Motor de plantillas para vistas dinámicas.
- Socket.io: Comunicación en tiempo real entre cliente y servidor.
- Sistema de archivos (JSON): Persistencia simple sin base de datos real.
- Postman (recomendado para pruebas).

---

## 📂 Estructura principal del proyecto

```
/
├── app.js                  # Archivo principal que levanta el servidor y configura rutas
├── managers/
│   ├── ProductManager.js   # Lógica y persistencia para productos
│   └── CartManager.js      # Lógica y persistencia para carritos
├── routes/
│   ├── products.router.js  # Endpoints para productos
│   ├── carts.router.js     # Endpoints para carritos
│   └── views.router.js     # Endpoints para vistas Handlebars
├── views/
│   ├── home.handlebars             # Vista con lista de productos
│   ├── realTimeProducts.handlebars # Vista con productos en tiempo real (WebSocket)
│   └── layouts/
│       └── main.handlebars         # Layout principal para Handlebars
├── public/
│   └── styles.css          # Estilos para las vistas
├── data/
│   ├── products.json       # Datos de productos
│   └── carts.json          # Datos de carritos
└── package.json            # Dependencias y scripts
```

---

## 🚦 Endpoints Disponibles

### Productos (`/api/products`)
| Método | Ruta                  | Descripción                              |
|--------|-----------------------|------------------------------------------|
| GET    | /api/products         | Listar todos los productos               |
| GET    | /api/products/:pid    | Obtener producto por ID                  |
| POST   | /api/products         | Crear un producto nuevo (ID autogenerado)|
| PUT    | /api/products/:pid    | Actualizar producto (sin modificar ID)   |
| DELETE | /api/products/:pid    | Eliminar producto por ID                 |

### Carritos (`/api/carts`)
| Método | Ruta                                 | Descripción                                         |
|--------|--------------------------------------|-----------------------------------------------------|
| POST   | /api/carts                           | Crear un carrito nuevo (ID autogenerado)            |
| GET    | /api/carts/:cid                      | Listar productos del carrito                        |
| POST   | /api/carts/:cid/product/:pid         | Agregar producto al carrito (incrementa cantidad si existe) |

---

## 🖥️ Vistas disponibles

- `/`  
  Muestra la lista de productos actuales (home.handlebars).

- `/realtimeproducts`  
  Muestra la lista de productos en tiempo real. Permite agregar y eliminar productos mediante formulario y botones. La lista se actualiza automáticamente en todas las pestañas abiertas gracias a WebSocket.

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
   - [http://localhost:8080/](http://localhost:8080/) para la vista principal.
   - [http://localhost:8080/realtimeproducts](http://localhost:8080/realtimeproducts) para la vista en tiempo real.
