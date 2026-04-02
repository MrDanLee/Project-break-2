const express = require("express");
const router = express.Router();
const { showProducts, showProductById, showNewProduct, createProduct, showEditProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rutas públicas
router.get("/products", showProducts);
router.get("/products/:productId", showProductById);

// Rutas protegidas (dashboard)
router.get("/dashboard", authMiddleware, showProducts);

router.get("/dashboard/new", authMiddleware, showNewProduct);
router.post("/dashboard", authMiddleware, createProduct);
router.get("/dashboard/:productId", authMiddleware, showProductById);
router.get("/dashboard/:productId/edit", authMiddleware, showEditProduct);
router.put("/dashboard/:productId", authMiddleware, updateProduct);
router.delete("/dashboard/:productId/delete", authMiddleware, deleteProduct);

module.exports = router;

