const User = require("../models/userModel");

// Lấy tất cả người dùng - chỉ admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy danh sách users" });
  }
};

module.exports = { getAllUsers };
