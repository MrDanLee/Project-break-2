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
  let nav = `
    <nav>
      <a href="/products">Productos</a>
      <a href="/dashboard">Dashboard</a>
      ${isDashboard ? '<a href="/dashboard/new">+ Nuevo Producto</a>' : ''}
    </nav>
  `;
  return nav;
}

function getProductCards(products, isDashboard = false) {
  let html = '<div class="products-grid">';
  for (let product of products) {
    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <a href="${isDashboard ? '/dashboard' : '/products'}/${product._id}">Ver detalle</a>
        ${isDashboard ? `
          <a href="/dashboard/${product._id}/edit">Editar</a>
          <form action="/dashboard/${product._id}/delete" method="POST">
            <button type="submit">Eliminar</button>
          </form>
        ` : ''}
      </div>
    `;
  }
  html += '</div>';
  return html;
}

function getProductDetail(product, isDashboard = false) {
  return `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}">
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <p class="price">${product.price}€</p>
      <p>Categoría: ${product.category}</p>
      ${isDashboard ? `
        <a href="/dashboard/${product._id}/edit">Editar</a>
        <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
          <button type="submit">Eliminar</button>
        </form>
      ` : ''}
      <a href="${isDashboard ? '/dashboard' : '/products'}">Volver</a>
    </div>
  `;
}

function getSelectOptions(options, selected = '') {
  let html = '<option value="">— Selecciona —</option>';
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
    <div class="product-form">
      <h1>${isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h1>
      <form action="${action}" method="POST">
        <label for="name">Nombre</label>
        <input type="text" name="name" id="name" value="${isEdit ? product.name : ''}" required>

        <label for="description">Descripción</label>
        <textarea name="description" id="description" required>${isEdit ? product.description : ''}</textarea>

        <label for="price">Precio (€)</label>
        <input type="number" name="price" id="price" step="0.01" min="0" value="${isEdit ? product.price : ''}" required>

        <label for="image">URL de imagen</label>
        <input type="text" name="image" id="image" value="${isEdit ? product.image : ''}">

        <label for="category">Categoría</label>
        <select name="category" id="category" required>
          ${getSelectOptions(validCategories, isEdit ? product.category : '')}
        </select>

        <label for="size">Talla</label>
        <select name="size" id="size" required>
          ${getSelectOptions(validSizes, isEdit ? product.size : '')}
        </select>

        <button type="submit">${isEdit ? 'Actualizar' : 'Crear'}</button>
      </form>
      <a href="/dashboard">Cancelar</a>
    </div>
  `;
}

module.exports = { baseHtml, closeHtml, getNavBar, getProductCards, getProductDetail, getProductForm };
