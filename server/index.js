// Import các gói cần thiết
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app"); // Import ứng dụng Express từ app.js

// Cấu hình để sử dụng file .env
dotenv.config();

// Kết nối đến MongoDB
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("Error connecting to MongoDB 🔴:", error);
    process.exit(1); // Dừng server nếu kết nối thất bại
  });

// Thiết lập cổng từ biến môi trường hoặc dùng mặc định là 5000
const PORT = process.env.PORT || 3000;

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🟢`);
});

// Check server connect
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
// console.log("DB_SERVER:", process.env.DB_SERVER);
// console.log("DB_DATABASE:", process.env.DB_DATABASE);
