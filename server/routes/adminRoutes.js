const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createAdminUser,
} = require("../controllers/adminController");

// // Để lấy tất cả người dùng (chỉ dành cho quản trị viên)
router.get("/users", getAllUsers);

// Để có được một người dùng cụ thể theo ID (chỉ dành cho quản trị viên)
router.get("/users/:id", getUserById);

// Cập nhật thông tin người dùng (chỉ dành cho quản trị viên)
router.put("/users/:id", updateUser);

// Xóa người dùng theo ID (chỉ dành cho quản trị viên)
router.delete("/users/:id", deleteUser);

// Tạo người dùng quản trị mới (chỉ dành cho quản trị viên)
router.post("/createAdmin", createAdminUser);

module.exports = router;
