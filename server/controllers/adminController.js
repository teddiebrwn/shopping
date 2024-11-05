const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken"); // Nhớ import jwt
const moment = require("moment"); //lib format date

// Registration
exports.registerAdmin = async (req, res) => {
  const {
    role,
    email,
    phone,
    username,
    password,
    firstName,
    lastName,
    dateOfBirth,
  } = req.body;

  try {
    // const Model = Admin gán cứng
    const Model = role === "admin" || role === "superadmin" ? Admin : User;
    // already account
    const existingAdmin = await Model.findOne({
      $or: [{ email }, { phone }, { username }],
    });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin -> Email, phone, or username already in use.",
      });
    }
    //create a new admin
    const newAdmin = new Model({
      email,
      phone,
      username,
      password,
      firstName,
      lastName,
      dateOfBirth,
    });
    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Registration successful.", user: newAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed.", error: error.message });
  }
};

// Login
exports.loginAdmin = async (req, res) => {
  const { role, identifier, password, twoFactorCode } = req.body;
  try {
    // Gán cứng Model cho admin
    const Model = role === "admin" || role === "superadmin" ? Admin : User;

    // Tìm admin dựa trên email, phone hoặc username
    const admin = await Model.findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
        { username: identifier },
      ],
    });

    if (!admin) {
      return res.status(404).json({ message: "User not found." });
    }

    // Xác thực mật khẩu
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Nếu xác thực hai yếu tố được kích hoạt, kiểm tra mã
    if (admin.twoFactorCode && !admin.verifyTwoFactorCode(twoFactorCode)) {
      return res.status(401).json({ message: "Invalid two-factor code." });
    }

    // Tạo JWT sau khi đăng nhập thành công
    const token = jwt.sign(
      { id: admin._id, role: admin.role }, //payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login successful.",
      token,
      admin: {
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        phone: admin.phone,
        // add information send client
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error: error.message });
  }
};

//Delete all admins
exports.deleteAdmin = async (req, res) => {
  const { role, identifier } = req.body;
  try {
    // const Model = Admin gán cứng
    const Model = role === "admin" || role === "superadmin" ? Admin : User;
    const admin = await Model.findOneAndDelete({
      $or: [
        { email: identifier }, //1 trong 3 cái nào cũng được email/phone/username
        { phone: identifier },
        { username: identifier },
      ],
    });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    res
      .status(200)
      .json({ message: "Admin deleted successfully.", deletedAdmin: admin });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed.", error: error.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    // Get all admins from the database
    const admins = await Admin.find();
    // Format date of each account
    const formattedAdmins = admins.map((admin) => {
      return {
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        phone: admin.phone,
        dateOfBirth: moment(admin.dateOfBirth).format("DD-MM-YYYY"), // Format date
        createdAt: admin.createdAt,
      };
    });
    res.status(200).json({
      message: "Admins retrieved successfully.",
      admins: formattedAdmins,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching admins.",
      error: error.message,
    });
  }
  // Delete inactive admins
};
exports.deleteInactiveAdmins = async (req, res) => {
  try {
    const result = await Admin.deleteMany({ active: false });
    res.status(200).json({
      message: `${result.deletedCount} inactive admins deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting inactive admins.",
      error: error.message,
    });
  }
};
