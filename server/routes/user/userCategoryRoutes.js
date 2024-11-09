const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");

// Get all categories (user can view all categories)
router.get("/category-all", categoryController.getAllCategories);

// Get a category by ID (user can view a specific category)
router.get("/category/:id", categoryController.getCategoryById);

module.exports = router;
