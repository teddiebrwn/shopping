const User = require("../models/User"); // Đảm bảo bạn có User model

// Lấy thông tin cá nhân của người dùng
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Không trả về password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user profile" });
  }
};

// Cập nhật thông tin cá nhân của người dùng
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Cập nhật thông tin
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user profile" });
  }
};
// Lấy tất cả danh mục
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Lấy danh sách danh mục từ database
    res.status(200).json(categories); // Trả về danh mục với mã 200
  } catch (error) {
    console.error(error); // Ghi log lỗi
    res.status(500).json({ message: "Failed to retrieve categories" }); // Trả lỗi 500 nếu có lỗi server
  }
};
