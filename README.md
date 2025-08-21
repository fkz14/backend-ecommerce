# Backend API - Gestión de Productos y Carritos 🛠️

Este proyecto es un servidor backend desarrollado con **Node.js** y **Express** para gestionar productos y carritos de compra. Está pensado para una API REST simple con persistencia en archivos JSON, ideal para aprender y practicar conceptos backend.

---

✨ **Características principales**

- 📦 **Gestión completa de productos:** Crear, listar, actualizar y eliminar productos con campos como título, descripción, código, precio, stock, categoría y más.
- 🛒 **Manejo de carritos de compra:** Crear carritos, listar sus productos y agregar productos a un carrito, incrementando cantidad si ya existe.
- 💾 **Persistencia sencilla:** Los datos se guardan en archivos JSON (`products.json` y `carts.json`), simulando una base de datos básica.
- 🚀 **Servidor Express robusto:** Endpoints claros y organizados bajo rutas `/api/products` y `/api/carts`.
- 🧰 **Preparado para integrarse con cualquier cliente REST:** Postman, frontends, etc.

---

🛠️ **Tecnologías utilizadas**

- **Node.js:** Entorno de ejecución JavaScript en backend.
- **Express:** Framework para crear servidores y manejar rutas HTTP.
- **Sistema de archivos (JSON):** Persistencia simple sin base de datos real.
- **Postman (recomendado para pruebas).**

---

📂 **Estructura principal del proyecto**

/
├── app.js # Archivo principal que levanta el servidor y configura rutas
├── managers/
│ ├── ProductManager.js # Lógica y persistencia para productos
│ └── CartManager.js # Lógica y persistencia para carritos
├── routes/
│ ├── products.router.js # Endpoints para productos
│ └── carts.router.js # Endpoints para carritos
├── data/
│ ├── products.json # Datos de productos
│ └── carts.json # Datos de carritos
└── package.json # Dependencias y scripts

---

🚦 **Endpoints Disponibles**

### Productos (`/api/products`)

| Método | Ruta                   | Descripción                                        |
|--------|------------------------|--------------------------------------------------|
| GET    | `/api/products`         | Listar todos los productos                         |
| GET    | `/api/products/:pid`    | Obtener producto por ID                            |
| POST   | `/api/products`         | Crear un producto nuevo (ID autogenerado)          |
| PUT    | `/api/products/:pid`    | Actualizar producto (sin modificar ID)            |
| DELETE | `/api/products/:pid`    | Eliminar producto por ID                           |

### Carritos (`/api/carts`)

| Método | Ruta                             | Descripción                                         |
|--------|---------------------------------|---------------------------------------------------|
| POST   | `/api/carts`                    | Crear un carrito nuevo (ID autogenerado)            |
| GET    | `/api/carts/:cid`               | Listar productos del carrito                        |
| POST   | `/api/carts/:cid/product/:pid` | Agregar producto al carrito (incrementa cantidad si existe) |

---

