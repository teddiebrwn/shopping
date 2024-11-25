const express = require("express");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const authenticateUser = require("./middleware/authenticateUser");
const limiter = require("./middleware/rateLimiter");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();
app.use(express.json());

app.use(limiter);
app.use("/api/auth", authRoutes);
app.use("/api/admin", authenticateUser, adminRoutes);
app.use("/api/user", authenticateUser, userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

module.exports = app;
