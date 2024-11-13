const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers);
router.delete("/", userController.deleteUser);
router.delete("/inactive", userController.deleteInactiveUsers);

module.exports = router;
