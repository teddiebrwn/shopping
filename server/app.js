const express = require("express");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const authenticateUser = require("./middleware/authenticateUser");
const limiter = require("./middleware/rateLimiter");

const app = express();
app.use(express.json());

// Routes
app.use(limiter);
app.use("/api/auth", authRoutes);
app.use("/api/admin", authenticateUser, adminRoutes);
app.use("/api/user", authenticateUser, userRoutes);

module.exports = app;
