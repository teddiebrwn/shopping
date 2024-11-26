const express = require("express");
const {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.use(authenticateUser);

router.post("/", addItemToCart);
router.get("/", getCart);
router.put("/:productId", updateCartItem);
router.delete("/:productId", removeCartItem);
router.delete("/", clearCart);

module.exports = router;
