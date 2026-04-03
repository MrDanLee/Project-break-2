const baseHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tienda</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
`;

const closeHtml = `</body></html>`;

function getNavBar(isDashboard = false) {
  const base = isDashboard ? '/dashboard' : '/products';
  return `
    <nav>
      <a href="${base}">Productos</a>
      <a href="${base}?category=Camisetas">Camisetas</a>
      <a href="${base}?category=Pantalones">Pantalones</a>
      <a href="${base}?category=Zapatos">Zapatos</a>
      <a href="${base}?category=Accesorios">Accesorios</a>
      ${isDashboard
        ? '<a href="/dashboard/new">Nuevo Producto</a><a href="/logout">Logout</a>'
        : '<a href="/login">Login</a>'}
    </nav>
  `;
}

function getProductCards(products, isDashboard = false) {
  let html = '<div class="products-grid">';
  for (let product of products) {
    html += `
      <div class="product-card">
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <a class="btn" href="${isDashboard ? '/dashboard' : '/products'}/${product._id}">Ver</a>
      </div>
    `;
  }
  html += '</div>';
  return html;
}

function getProductDetail(product, isDashboard = false) {
  return `
    <div class="product-detail">
      <h1>${product.name}</h1>
      <img src="${product.image}" alt="${product.name}">
      <p>${product.description}</p>
      <p class="price">${product.price}€</p>
      <p>Categoría: ${product.category}</p>
      <p><strong>Talla: ${product.size}</strong></p>
      ${isDashboard ? `
        <a class="btn" href="/dashboard/${product._id}/edit">Editar</a>
        <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
          <button class="btn" type="submit">Borrar</button>
        </form>
      ` : ''}
    </div>
  `;
}

function getSelectOptions(options, selected = '') {
  let html = '';
  for (let option of options) {
    html += `<option value="${option}"${option === selected ? ' selected' : ''}>${option}</option>`;
  }
  return html;
}

function getProductForm(product = null) {
  const { validCategories, validSizes } = require('../models/Product');
  const isEdit = product !== null;
  const action = isEdit ? `/dashboard/${product._id}?_method=PUT` : '/dashboard';

  return `
    <h1 class="form-title">${isEdit ? 'Editar Producto' : 'Crear Producto'}</h1>
    <div class="form-card">
      <form action="${action}" method="POST" enctype="multipart/form-data">
        <label for="name">Nombre:</label>
        <input type="text" name="name" id="name" value="${isEdit ? product.name : ''}" required>

        <label for="description">Descripción:</label>
        <textarea name="description" id="description" required>${isEdit ? product.description : ''}</textarea>

        <label for="price">Precio:</label>
        <input type="number" name="price" id="price" step="0.01" min="0" value="${isEdit ? product.price : ''}" required>

        <label for="image">Imagen:</label>
        <input type="file" name="image" id="image" accept="image/*" ${isEdit ? '' : 'required'}>

        <label for="category">Categoría:</label>
        <select name="category" id="category" required>
          ${getSelectOptions(validCategories, isEdit ? product.category : '')}
        </select>

        <label for="size">Talla:</label>
        <select name="size" id="size" required>
          ${getSelectOptions(validSizes, isEdit ? product.size : '')}
        </select>

        <button class="btn" type="submit">${isEdit ? 'Guardar' : 'Crear'}</button>
      </form>
      ${isEdit ? '<a class="btn" href="/dashboard">Cancelar</a>' : ''}
    </div>
  `;
}

module.exports = { baseHtml, closeHtml, getNavBar, getProductCards, getProductDetail, getProductForm };
