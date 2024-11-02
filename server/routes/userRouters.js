const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyUser,
  deleteAllUsers,
} = require("../controllers/userController");

// Đăng ký người dùng mới
router.post("/register", registerUser);

// Đăng nhập người dùng
router.post("/login", loginUser);

// Xác thực tài khoản
router.post("/verify", verifyUser);

// Xoá tất cả người dùng
router.delete("/deleteAll", deleteAllUsers);

module.exports = router;
