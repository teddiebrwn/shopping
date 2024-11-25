const express = require("express");
const {
  addItemToWishlist,
  getWishlist,
  removeItemFromWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.use(authenticateUser);

router.post("/", addItemToWishlist);
router.get("/", getWishlist);
router.delete("/:productId", removeItemFromWishlist);
router.delete("/", clearWishlist);

module.exports = router;
