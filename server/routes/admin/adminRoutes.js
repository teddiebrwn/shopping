const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");

router.post("/accounts", adminController.registerAdmin);
router.post("/accounts/login", adminController.loginAdmin);
router.get("/accounts", adminController.getAllAdmins);
router.delete("/accounts", adminController.deleteAdmin);
router.delete("/accounts/inactive", adminController.inactiveAdmin);

module.exports = router;
