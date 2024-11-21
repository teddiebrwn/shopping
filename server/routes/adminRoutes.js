const express = require("express");
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", authenticate, isAdmin, getAllUsers);
router.post("/users", authenticate, isAdmin, addUser);
router.put("/users/:id", authenticate, isAdmin, updateUser);
router.delete("/users/:id", authenticate, isAdmin, deleteUser);
router.delete("/users", authenticate, isAdmin, deleteAllUsers);

module.exports = router;
