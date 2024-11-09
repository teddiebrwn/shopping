// Cấu hình dotenv để sử dụng biến môi trường từ file .env
const dotenv = require("dotenv");
dotenv.config();
// Import các gói cần thiết
const express = require("express");
const cors = require("cors"); // Cho phép CORS nếu frontend và backend trên các tên miền khác nhau
const userRoutes = require("./routes/user/userRoutes"); // Adjust path as needed
const adminRoutes = require("./routes/admin/adminRoutes");
const adminController = require("./controllers/adminController"); // Đường dẫn tới file controller
const adminCategoryRoutes = require("./routes/admin/adminCategoryRoutes");
const adminProductRoutes = require("./routes/admin/adminProductRoutes");
const userController = require("./controllers/userController"); // Đường dẫn tới file controller
const userCategoryRoutes = require("./routes/user/userCategoryRoutes");
const userProductRoutes = require("./routes/user/userProductRoutes");
const sendMail = require("./services/emailService");

// Khởi tạo ứng dụng Express
const app = express();

// Middleware để xử lý CORS
app.use(cors());

// Middleware để đọc dữ liệu JSON từ client
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user/category", userCategoryRoutes);
app.use("/api/admin/category", adminCategoryRoutes);
app.use("/api/user/product", userProductRoutes);
app.use("/api/admin/product", adminProductRoutes);
// app.use("/api/auth", authRoutes);

//check
console.log(adminController);
console.log(userController);
console.log(sendMail);
module.exports = app;
