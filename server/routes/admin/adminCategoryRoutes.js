const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");

// Create a new category (admin only)
router.post("/category-create", categoryController.createCategory);

// Update a category (admin only)
router.put("/category-update/:id", categoryController.updateCategory);

// Delete a category (admin only)
router.delete("/category-delete/:id", categoryController.deleteCategory);

module.exports = router;
