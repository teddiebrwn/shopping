const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user/userRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
const adminController = require("./controllers/adminController");
const adminCategoryRoutes = require("./routes/admin/adminCategoryRoutes");
const adminProductRoutes = require("./routes/admin/adminProductRoutes");
const userController = require("./controllers/userController");
const userCategoryRoutes = require("./routes/user/userCategoryRoutes");
const userProductRoutes = require("./routes/user/userProductRoutes");
const sendMail = require("./services/emailService");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user/category", userCategoryRoutes);
app.use("/api/admin/category", adminCategoryRoutes);
app.use("/api/user/product", userProductRoutes);
app.use("/api/admin/product", adminProductRoutes);

console.log(adminController);
console.log(userController);
console.log(sendMail);
module.exports = app;
