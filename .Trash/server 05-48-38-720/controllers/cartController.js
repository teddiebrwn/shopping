const Cart = require("../models/cart");
const Product = require("../models/product");

exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const userId = req.user.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        priceAtPurchase: product.price,
        quantity,
      });
    }

    await cart.save();
    res.status(200).json({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item to cart", error });
  }
};
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const cartWithTotal = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      itemTotal: item.productId.price * item.quantity,
    }));
    const totalPrice = cartWithTotal.reduce(
      (acc, item) => acc + item.itemTotal,
      0
    );
    res.status(200).json({
      userId: cart.userId,
      items: cartWithTotal,
      totalPrice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve cart", error });
  }
};
exports.updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart item", error });
  }
};
exports.removeCartItem = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json({
      message: "Item removed from cart successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove item from cart", error });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items: [] },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to clear cart", error });
  }
};
