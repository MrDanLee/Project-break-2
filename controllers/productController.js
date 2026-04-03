const Product = require("../models/Product");
const {
  baseHtml,
  closeHtml,
  getNavBar,
  getProductCards,
  getProductDetail,
  getProductForm,
} = require("../helpers/htmlHelpers");

// GET /products  y  GET /dashboard (con filtrado por categoría)
const showProducts = async (req, res) => {
  try {
    const isDashboard = req.path.startsWith("/dashboard");
    const filter = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find(filter);
    const html =
      baseHtml +
      getNavBar(isDashboard) +
      `<h1 class="page-title">Productos</h1>` +
      getProductCards(products, isDashboard) +
      closeHtml;
    res.send(html);
  } catch (error) {
    res.status(500).send("Error al obtener productos");
  }
};

// GET /products/:productId  y  GET /dashboard/:productId
const showProductById = async (req, res) => {
  try {
    const isDashboard = req.path.startsWith("/dashboard");
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    const html =
      baseHtml +
      getNavBar(isDashboard) +
      getProductDetail(product, isDashboard) +
      closeHtml;
    res.send(html);
  } catch (error) {
    res.status(500).send("Error al obtener el producto");
  }
};

// GET /dashboard/new
const showNewProduct = async (req, res) => {
  try {
    const html =
      baseHtml +
      getNavBar(true) +
      getProductForm() +
      closeHtml;
    res.send(html);
  } catch (error) {
    res.status(500).send("Error al cargar el formulario");
  }
};

// POST /dashboard
const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    if (req.file) {
      productData.image = req.file.path;
    }
    const product = await Product.create(productData);
    res.redirect("/dashboard/" + product._id);
  } catch (error) {
    res.status(500).send("Error al crear el producto");
  }
};

// GET /dashboard/:productId/edit
const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    const html =
      baseHtml +
      getNavBar(true) +
      getProductForm(product) +
      closeHtml;
    res.send(html);
  } catch (error) {
    res.status(500).send("Error al cargar el formulario de edición");
  }
};

// PUT /dashboard/:productId
const updateProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    if (req.file) {
      productData.image = req.file.path;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      productData,
      { new: true }
    );
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    res.redirect("/dashboard/" + product._id);
  } catch (error) {
    res.status(500).send("Error al actualizar el producto");
  }
};

// DELETE /dashboard/:productId/delete
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send("Error al eliminar el producto");
  }
};

module.exports = {
  showProducts,
  showProductById,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct,
};
