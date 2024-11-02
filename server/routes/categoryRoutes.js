const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Route để tạo danh mục mới
router.post("/category", createCategory);

// Route để lấy danh sách tất cả danh mục
router.get("/categories", getCategories);

// Route để cập nhật danh mục
router.put("/category/:id", updateCategory);

// Route để xóa danh mục
router.delete("/category/:id", deleteCategory);

module.exports = router;
