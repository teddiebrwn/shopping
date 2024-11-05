// Cấu hình dotenv để sử dụng biến môi trường từ file .env
const dotenv = require("dotenv");
dotenv.config();
// Import các gói cần thiết
const express = require("express");
const cors = require("cors"); // Cho phép CORS nếu frontend và backend trên các tên miền khác nhau
const userRoutes = require("./routes/userRoutes"); // Adjust path as needed
const adminRoutes = require("./routes/adminRoutes");
const adminController = require("./controllers/adminController"); // Đường dẫn tới file controller
const sendMail = require("./services/emailService");
const userController = require("./controllers/userController"); // Đường dẫn tới file controller

// Khởi tạo ứng dụng Express
const app = express();

// Middleware để xử lý CORS
app.use(cors());

// Middleware để đọc dữ liệu JSON từ client
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
// app.use("/api/auth", authRoutes);

//check
console.log(adminController);
console.log(userController);
console.log(sendMail);
module.exports = app;
