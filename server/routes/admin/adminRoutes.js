const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  deleteAdmin,
  inactiveAdmin,
} = require("../../controllers/adminController");

// **Đăng ký Admin**
router.post("/registerAdmin", registerAdmin);

// **Đăng nhập Admin**
router.post("/loginAdmin", loginAdmin);

// **Lấy danh sách tất cả Admin**
router.get("/getAllAdmins", getAllAdmins);

// **Xóa một Admin (bằng email, phone hoặc username)**
router.delete("/deleteAdmin", deleteAdmin);

// **Xóa các Admin không hoạt động**
router.delete("/inactiveAdmins", inactiveAdmin);

module.exports = router;
