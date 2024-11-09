const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

// Get all products (user can view all products)
router.get("/product-all-clothing", productController.getAllProducts);

// Get a product by ID (user can view a specific product)
router.get("/product/:id", productController.getProductById);

module.exports = router;
