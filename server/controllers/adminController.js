const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");

// **Register Admin**
exports.registerAdmin = async (req, res) => {
  const {
    role = "admin", // Mặc định là "admin"
    email,
    phone,
    username,
    password,
    firstName,
    lastName,
    dateOfBirth,
  } = req.body;

  try {
    // Kiểm tra giá trị nào cần kiểm tra trùng lặp
    const duplicateCheck = [];
    if (email) duplicateCheck.push({ email });
    if (phone) duplicateCheck.push({ phone });
    if (username) duplicateCheck.push({ username });

    // Yêu cầu ít nhất 1 trong 3 giá trị: email, phone, hoặc username
    if (duplicateCheck.length === 0) {
      return res
        .status(400)
        .json({ message: "Cần ít nhất một trong email, phone hoặc username." });
    }

    // Kiểm tra trùng lặp trong cơ sở dữ liệu
    const existingAdmin = await Admin.findOne({ $or: duplicateCheck });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin -> Email, phone, hoặc username đã tồn tại." });
    }

    // Tạo Admin mới
    const newAdmin = new Admin({
      role,
      email,
      phone,
      username,
      password,
      firstName,
      lastName,
      dateOfBirth,
    });
    await newAdmin.save(); // Lưu vào database

    res.status(201).json({
      message: "Tạo tài khoản thành công.",
      user: { _id: newAdmin._id, username: newAdmin.username },
    });
  } catch (error) {
    res.status(500).json({
      message: "Đăng ký thất bại.",
      error: error.message,
    });
  }
};

// **Login Admin**
exports.loginAdmin = async (req, res) => {
  const { identifier, password } = req.body; // `identifier` có thể là email, phone hoặc username

  try {
    // Tìm admin theo email, phone, hoặc username
    const admin = await Admin.findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
        { username: identifier },
      ],
    });
    if (!admin) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản." });
    }

    // So sánh mật khẩu
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác." });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công.",
      token,
      admin: {
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        phone: admin.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Đăng nhập thất bại.",
      error: error.message,
    });
  }
};

// **Get All Admins**
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find(); // Lấy tất cả Admins
    const formattedAdmins = admins.map((admin) => ({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      phone: admin.phone,
      dateOfBirth: moment(admin.dateOfBirth).format("DD-MM-YYYY"), // Format ngày sinh
      createdAt: admin.createdAt,
    }));
    res.status(200).json({
      message: "Lấy danh sách Admins thành công.",
      admins: formattedAdmins,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không thể lấy danh sách Admins.",
      error: error.message,
    });
  }
};

// **Delete Admin**
exports.deleteAdmin = async (req, res) => {
  const { identifier } = req.body; // `identifier` là email, phone hoặc username

  try {
    const admin = await Admin.findOneAndDelete({
      $or: [
        { email: identifier },
        { phone: identifier },
        { username: identifier },
      ],
    });
    if (!admin) {
      return res.status(404).json({ message: "Không tìm thấy Admin." });
    }
    res.status(200).json({
      message: "Xóa Admin thành công.",
      deletedAdmin: admin,
    });
  } catch (error) {
    res.status(500).json({
      message: "Xóa Admin thất bại.",
      error: error.message,
    });
  }
};
// **Xóa các Admin không còn hoạt động**
exports.inactiveAdmin = async (req, res) => {
  try {
    // Xóa tất cả Admin có trường `active` là false
    const result = await Admin.deleteMany({ active: false });

    res.status(200).json({
      message: `${result.deletedCount} inactive admins đã được xóa.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Xóa các inactive admin thất bại.",
      error: error.message,
    });
  }
};
