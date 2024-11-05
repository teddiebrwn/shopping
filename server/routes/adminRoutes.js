const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Registration
router.post("/registerAdmin", adminController.registerAdmin);
//Verification
//Login
router.post("/loginAdmin", adminController.loginAdmin);
//Get
router.get("/findAdmin", adminController.getAllAdmins);
// Delete based on username/mail/phone
router.delete("/deleteAdmin", adminController.deleteAdmin);
// Delete inactivate admins
router.delete("/inactiveAdmin", adminController.deleteInactiveAdmins);

module.exports = router;
