// const Admin = require("../models/Admin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const moment = require("moment"); //lib format date

// Registration
exports.registerUser = async (req, res) => {
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
    // const Model = User gán cứng
    const Model = role === "admin" || role === "superadmin" ? Admin : User;
    //already account
    const existingUser = await Model.findOne({
      $or: [{ email }, { phone }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User -> Email, phone, or username already in use." });
    }
    //create a new user
    const newUser = new Model({
      email,
      phone,
      username,
      password,
      firstName,
      lastName,
      dateOfBirth,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Registration successful.", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed.", error: error.message });
  }
};
//verification

// Login
exports.loginUser = async (req, res) => {
  const { role, identifier, password, twoFactorCode } = req.body;
  try {
    // Gán cứng Model
    const Model = role === "admin" || role === "superadmin" ? Admin : User;

    // Tìm người dùng dựa trên email/phone/username
    const user = await Model.findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
        { username: identifier },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Xác thực mật khẩu
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Nếu xác thực hai yếu tố được kích hoạt, kiểm tra mã
    if (user.twoFactorCode && !user.verifyTwoFactorCode(twoFactorCode)) {
      return res.status(401).json({ message: "Invalid two-factor code." });
    }
    //create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, //payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        // add information send client
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error: error.message });
  }
};

//Delete all users
exports.deleteUser = async (req, res) => {
  const { role, identifier } = req.body;
  try {
    // const Model = User gán cứng
    const Model = role === "admin" || role === "superadmin" ? Admin : User;
    // Find and delete user = username/mail/phone
    const user = await Model.findOneAndDelete({
      $or: [
        { email: identifier }, //1 trong 3 cái nào cũng được email/phone/username
        { phone: identifier },
        { username: identifier },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully.", deletedUser: user });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed.", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Get all users from the database
    const users = await User.find();
    // Format date of each account
    const formattedUser = users.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        dateOfBirth: moment(user.dateOfBirth).format("DD-MM-YYYY"), // Format date
        createdAt: user.createdAt,
      };
    });
    res.status(200).json({
      message: "Users retrieved successfully.",
      users: formattedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users.",
      error: error.message,
    });
  }
};
// Delete inactive users
exports.deleteInactiveUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({ active: false });
    res.status(200).json({
      message: `${result.deletedCount} inactive users deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting inactive users.",
      error: error.message,
    });
  }
};
