const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories, // Lấy danh mục
} = require("../controllers/categoryController");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts, // Lấy sản phẩm
} = require("../controllers/productController");

const {
  getAllUsers,
  updateUser,
  deleteUser,
  getSystemLogs, // Xem logs hệ thống
  getAnalytics, // Xem thống kê
} = require("../controllers/adminController");

const checkRole = require("../middleware/checkRole");

const router = express.Router();

// Middleware kiểm tra quyền admin
router.use(checkRole("admin"));

// Routes liên quan đến danh mục
router.get("/categories", getCategories); // Lấy tất cả danh mục
router.post("/category", createCategory); // Tạo danh mục
router.put("/category/:id", updateCategory); // Cập nhật danh mục
router.delete("/category/:id", deleteCategory); // Xóa danh mục

// Routes liên quan đến sản phẩm
router.get("/products", getProducts); // Lấy tất cả sản phẩm
router.post("/product", createProduct); // Tạo sản phẩm
router.put("/product/:id", updateProduct); // Cập nhật sản phẩm
router.delete("/product/:id", deleteProduct); // Xóa sản phẩm

// Routes liên quan đến người dùng
router.get("/users", getAllUsers); // Lấy danh sách người dùng
router.put("/user/:id", updateUser); // Cập nhật người dùng
router.delete("/user/:id", deleteUser); // Xóa người dùng
// Routes quản trị khác
router.get("/logs", getSystemLogs); // Xem logs hệ thống
router.get("/analytics", getAnalytics); // Xem thống kê

module.exports = router;
