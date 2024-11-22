const express = require("express");
const {
  getCategories, // Lấy danh mục
} = require("../controllers/categoryController");

const {
  getProducts, // Lấy sản phẩm
} = require("../controllers/productController");

const {
  getUserProfile, // Lấy thông tin cá nhân
  updateUserProfile, // Cập nhật thông tin cá nhân
} = require("../controllers/userController");

const checkRole = require("../middleware/checkRole");

const router = express.Router();

// Middleware kiểm tra quyền user
router.use(checkRole("user"));

// Routes
router.get("/profile", getUserProfile); // Lấy thông tin cá nhân
router.put("/profile", updateUserProfile); // Cập nhật thông tin cá nhân
router.get("/categories", getCategories); // Lấy tất cả danh mục
router.get("/products", getProducts); // Lấy tất cả sản phẩm

module.exports = router;
