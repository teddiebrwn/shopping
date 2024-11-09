const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

// Create a new product (admin only)
router.post("/product-create", productController.createProduct);

// Update a product (admin only)
router.put("/product-update/:id", productController.updateProduct);

// Delete a product (admin only)
router.delete("/product-delete/:id", productController.deleteProduct);

module.exports = router;
