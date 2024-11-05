const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Registration
router.post("/registerUser", userController.registerUser);
//Verification
// router.get("/verify/:token", userController.verifyAccount);
//Login
router.post("/loginUser", userController.loginUser);
//Get
router.get("/findUser", userController.getAllUsers);
// Delete based on username/mail/phone
router.delete("/deleteUser", userController.deleteUser);
// Delete inactivate users
router.delete("/inactiveUser", userController.deleteInactiveUsers);

module.exports = router;
