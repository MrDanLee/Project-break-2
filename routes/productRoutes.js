const express = require("express");
const router = express.Router();
const { showProducts, showProductById, showNewProduct, createProduct, showEditProduct, updateProduct, deleteProduct } = require("../controllers/productController")
 
router.get("/products", showProducts);

router.get("/products/:productId", showProductById);

router.get("/dashboard", showProducts);

router.get("/dashboard/new", showNewProduct);

router.post("/dashboard", createProduct);

router.get("/dashboard/:productId", showProductById);

router.get("/dashboard/:productId/edit", showEditProduct);

router.put("/dashboard/:productId", updateProduct);

router.delete("/dashboard/:productId/delete", deleteProduct);

module.exports = router;

