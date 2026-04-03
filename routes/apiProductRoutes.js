const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/apiProductController");
const upload = require("../middlewares/uploadCloudinaryMiddleware");

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.post("/", upload.single("image"), createProduct);
router.put("/:productId", upload.single("image"), updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
