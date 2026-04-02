const Product = require("../models/Product");
const {
  baseHtml,
  closeHtml,
  getNavBar,
  getProductCards,
  getProductDetail,
  getProductForm,
} = require("../helpers/htmlHelpers");

// GET /products  y  GET /dashboard
const showProducts = async (req, res) => {
  try {
    const isDashboard = req.path.startsWith("/dashboard");
    const products = await Product.find();
    const html =
      baseHtml +
      getNavBar(isDashboard) +
      `<h1>${isDashboard ? "Dashboard" : "Productos"}</h1>` +
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
    const product = await Product.create(req.body);
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
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
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
