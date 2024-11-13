const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
exports.registerAdmin = async (req, res) => {
  const {
    role = "admin",
    email,
    phone,
    username,
    password,
    firstName,
    lastName,
    dateOfBirth,
  } = req.body;

  try {
    const duplicateCheck = [];
    if (email) duplicateCheck.push({ email });
    if (phone) duplicateCheck.push({ phone });
    if (username) duplicateCheck.push({ username });
    if (duplicateCheck.length === 0) {
      return res
        .status(400)
        .json({ message: "Cần ít nhất một trong email, phone hoặc username." });
    }
    const existingAdmin = await Admin.findOne({ $or: duplicateCheck });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin -> Email, phone, hoặc username đã tồn tại." });
    }
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
    await newAdmin.save();

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
exports.loginAdmin = async (req, res) => {
  const { identifier, password } = req.body;
  try {
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
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác." });
    }
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
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    const formattedAdmins = admins.map((admin) => ({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      phone: admin.phone,
      dateOfBirth: moment(admin.dateOfBirth).format("DD-MM-YYYY"),
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
exports.deleteAdmin = async (req, res) => {
  const { identifier } = req.body;
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
exports.inactiveAdmin = async (req, res) => {
  try {
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
