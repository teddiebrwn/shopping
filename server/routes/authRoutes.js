const express = require("express");
const {
  register,
  verify,
  login,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/authController");

const User = require("../models/User");
const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/login", login);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

router.delete("/clear-users", async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
