const express = require("express");
const router = express.Router();


router.get("/products", (req, res) => {
  res.send("All products");
});

router.get("/products/:productId", (req, req) => {
  res.send("Get product by Id");
});

router.get("/dashboard", (req, res) => {
  res.send("Admin Dashboard; all uploaded products");
});

router.get("/dashboard/new", (req, res) => {
  res.send("Upload new product form");
});

router.get("/dashboard/:productId", (req, res) => {
  res.send("Get dashboard product by Id");
});

router.get("/dashboard/:productId/edit", (req, res) => {
  res.send("Edit dashboard product form by Id");
});

router.put("/dashboard/productId", (req, res) => {
  res.send("Update a product");
});

router.delete("/dashboard/:productId/delete", (req, res) => {
  res.send("Delete a product");
});

