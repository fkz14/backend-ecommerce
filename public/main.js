// Se asegura de que todo el código dentro se ejecute cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Obtiene el valor del ID del carrito desde un input oculto
  const cartId = document.getElementById('cartId').value;

  // Función para cargar los productos de la API
  async function loadProducts(page = 1) {
    // Hace una petición GET a la API de productos, con soporte de paginación
    const res = await fetch(`/api/products?page=${page}`);
    // Convierte la respuesta en JSON
    const data = await res.json();
    // Selecciona el contenedor donde se mostrarán los productos
    const list = document.getElementById('productsList');
    // Limpia el contenido previo
    list.innerHTML = '';
    // Itera sobre cada producto recibido de la API
    data.payload.forEach(product => {
      // Agrega el HTML de cada producto al contenedor
      list.innerHTML += `
        <div class="product-card">
          <div>
            <div class="product-title">${product.title}</div>
            <div class="product-info">
              <div class="price-box">💲 ${product.price}</div>
              <div class="stock-box">Stock: ${product.stock}</div>
            </div>
            <div class="product-description">${product.description}</div>
          </div>
          <div class="product-actions">
            <button onclick="showDetail('${product._id}')">Detalle</button>
            <button onclick="showEdit('${product._id}')">Editar</button>
            <button onclick="deleteProduct('${product._id}')">Eliminar</button>
            <button onclick="addToCart('${product._id}')">Agregar al carrito</button>
          </div>
        </div>
      `;
    });
    // Manejo de la paginación
    const pag = document.getElementById('pagination');
    pag.innerHTML = '';
    if (data.hasPrevPage) pag.innerHTML += `<button onclick="loadProducts(${data.prevPage})">Anterior</button>`;
    pag.innerHTML += ` Página ${data.page} de ${data.totalPages} `;
    if (data.hasNextPage) pag.innerHTML += `<button onclick="loadProducts(${data.nextPage})">Siguiente</button>`;
  }

  // Muestra el formulario para agregar un producto
  document.getElementById('showAddForm').onclick = () => {
    document.getElementById('addProductForm').style.display = 'block';
    document.getElementById('editProductForm').style.display = 'none';
    document.getElementById('detailProduct').style.display = 'none';
  };

  // Maneja el envío del formulario para agregar producto
  document.getElementById('addProductForm').onsubmit = async e => {
    e.preventDefault(); // Previene que el formulario recargue la página
    const form = e.target;
    // Crea un objeto con los datos del producto
    const product = {
      title: form.title.value,
      description: form.description.value,
      code: form.code.value,
      price: Number(form.price.value),
      stock: Number(form.stock.value),
      category: form.category.value,
      status: true,
      thumbnails: []
    };
    // Hace la petición POST para agregar el producto
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (res.ok) {
      alert('Producto agregado'); // Notifica éxito
      form.reset();               // Limpia el formulario
      form.style.display = 'none';// Oculta el formulario
      loadProducts();             // Recarga la lista de productos
    } else {
      alert('Error al agregar producto: El codigo debe ser unico');
    }
  };

  // Muestra los detalles de un producto
  window.showDetail = async id => {
    const res = await fetch(`/api/products/${id}`); // Petición para obtener el producto
    const product = await res.json();
    const detail = document.getElementById('detailProduct');
    // Construye el HTML de detalle del producto
    detail.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>Precio: $${product.price}</p>
      <p>Categoría: ${product.category}</p>
      <p>Stock: ${product.stock}</p>
      <button onclick="addToCart('${product._id}')">Agregar al carrito</button>
      <button onclick="detailProduct.style.display='none'">Cerrar</button>
    `;
    detail.style.display = 'block';            // Muestra el detalle
    document.getElementById('addProductForm').style.display = 'none';
    document.getElementById('editProductForm').style.display = 'none';
  };

  // Muestra el formulario de edición de un producto
  window.showEdit = async id => {
    const res = await fetch(`/api/products/${id}`);
    const product = await res.json();
    const form = document.getElementById('editProductForm');
    // Rellena los campos con los datos del producto
    form.productId.value = product._id;
    form.title.value = product.title;
    form.description.value = product.description;
    form.code.value = product.code;
    form.price.value = product.price;
    form.stock.value = product.stock;
    form.category.value = product.category;
    form.style.display = 'block';             // Muestra el formulario
    document.getElementById('addProductForm').style.display = 'none';
    document.getElementById('detailProduct').style.display = 'none';
  };

  // Maneja el envío del formulario para editar producto
  document.getElementById('editProductForm').onsubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const id = form.productId.value;
    const updates = {
      title: form.title.value,
      description: form.description.value,
      code: form.code.value,
      price: Number(form.price.value),
      stock: Number(form.stock.value),
      category: form.category.value
    };
    // Petición PUT para actualizar el producto
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      alert('Producto actualizado');
      form.reset();
      form.style.display = 'none';
      loadProducts(); // Recarga la lista de productos
    } else {
      alert('Error al actualizar producto');
    }
  };

  // Elimina un producto
  window.deleteProduct = async id => {
    if (!confirm('¿Eliminar producto?')) return; // Pregunta antes de eliminar
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Producto eliminado');
      loadProducts(); // Recarga productos
    } else {
      alert('Error al eliminar producto');
    }
  };

  // Agrega un producto al carrito
  window.addToCart = async productId => {
    const res = await fetch(`/api/carts/${cartId}/product/${productId}`, { method: 'POST' });
    if (res.ok) {
      alert('Producto agregado al carrito');
      loadCart(); // Actualiza la vista del carrito
    } else {
      alert('Error al agregar al carrito');
    }
  };

  // Carga el carrito y muestra los productos
  async function loadCart() {
    const res = await fetch(`/api/carts/${cartId}`);
    const cart = await res.json();
    const list = document.getElementById('cartList');
    const totalDiv = document.getElementById('cartTotal');
    list.innerHTML = '';
    let total = 0;
    // Itera sobre cada producto en el carrito
    cart.products.forEach(item => {
      if (item.product && item.product.title) { // Si el producto está poblado
        const price = item.product.price || 0;
        const subtotal = price * item.quantity;
        total += subtotal;
        // Construye el HTML para mostrar cada producto en el carrito
        list.innerHTML += `
          <div class="product-card">
            <div>
              <div class="product-title">${item.product.title}</div>
              <div class="product-info">
                <div class="price-box">💲 ${price}</div>
                <div class="stock-box">Cantidad: ${item.quantity}</div>
                <div class="stock-box" style="background:#3b82f6;">Subtotal: $${subtotal}</div>
              </div>
              <div class="product-description">${item.product.description || ''}</div>
            </div>
            <div class="product-actions">
              <button onclick="updateQuantity('${cartId}','${item.product._id}',${item.quantity+1})">+</button>
              <button onclick="updateQuantity('${cartId}','${item.product._id}',${item.quantity-1})" ${item.quantity<=1?'disabled':''}>-</button>
              <button onclick="removeProduct('${cartId}','${item.product._id}')">Eliminar</button>
            </div>
          </div>
        `;
      }
    });
    // Muestra el total del carrito
    totalDiv.innerHTML = `Total del carrito: <span style="color:#3b82f6;">$${total}</span>`;
  }

  // Actualiza la cantidad de un producto en el carrito
  window.updateQuantity = async (cartId, productId, quantity) => {
    if (quantity < 1) return; // No permite cantidades menores a 1
    await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    loadCart(); // Actualiza la vista del carrito
  };

  // Elimina un producto del carrito
  window.removeProduct = async (cartId, productId) => {
    await fetch(`/api/carts/${cartId}/products/${productId}`, { method: 'DELETE' });
    loadCart(); // Actualiza la vista del carrito
  };

  // Vacía todo el carrito
  document.getElementById('emptyCartBtn').onclick = async () => {
    await fetch(`/api/carts/${cartId}`, { method: 'DELETE' });
    loadCart(); // Actualiza la vista del carrito
  };

  // Inicializa la página cargando productos y carrito
  loadProducts();
  loadCart();
  // Expone la función loadProducts globalmente para poder usarla en la paginación
  window.loadProducts = loadProducts;
});
