// Import các mô hình cần thiết (e.g., User model)
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

// Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Tìm tất cả người dùng
        res.status(200).json(users); // Trả về danh sách người dùng
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng" });
    }
};

// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Tìm người dùng theo ID
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật người dùng" });
    }
};

// Xóa người dùng theo ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        res.status(200).json({ message: "Đã xóa người dùng thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa người dùng" });
    }
};

// Tạo người dùng mới với quyền admin
const createAdminUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Người dùng đã tồn tại" });
        }

        const newUser = new User({
            username,
            email,
            password,  // Bạn có thể cần mã hóa mật khẩu trước khi lưu
            role: "admin", // Đặt vai trò là admin
        });

        await newUser.save();
        res.status(201).json({ message: "Tạo tài khoản admin thành công", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo tài khoản admin" });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createAdminUser,
};

