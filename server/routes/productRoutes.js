const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/product-all-clothing", productController.getAllProducts);

// Get a product by ID
router.get("/product/:id", productController.getProductById);

// Create a new product
router.post("/product-create", productController.createProduct);

// Update a product
router.put("/product-update/:id", productController.updateProduct);

// Delete a product
router.delete("/product-delete/:id", productController.deleteProduct);

module.exports = router;
