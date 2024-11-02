const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

// Tạo JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Tạo mã xác thực 6 chữ số
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Gửi mã xác thực qua email
const sendVerificationEmail = async (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Xác thực tài khoản",
    html: `
      <div style="text-align: center;">
        <h1 style="color: Black;">✨Welcome to Shopping Online✨</h1>
       <div style="border: 2px solid #a6a6a6; padding: 20px; border-radius: 10px;">
         <p style="color: #a6a6a6;">Chào mừng bạn đến với Shopping Online!</p>
         <p style="color: #a6a6a6;">Bạn có thể sử dụng mã xác thực này để đăng nhập vào tài khoản của bạn trong 1 tiếng.</p>
         <p style="color: #a6a6a6;">Cảm ơn bạn đã đăng ký tài khoản!</p>
         <p style="color: #a6a6a6;">Mã xác thực của bạn là: <strong style="color: Black;">${verificationCode}</strong></p>
         <h4 style="color: #a6a6a6;">Shopping Online Services Team 🚀</h4>
       </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Đăng ký người dùng mới
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  }

  const verificationCode = generateVerificationCode();

  const user = await User.create({
    name,
    email,
    password,
    role: "user",
    verificationCode,
    isVerified: false,
  });

  if (user) {
    await sendVerificationEmail(user.email, verificationCode); // Gửi mã qua email
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "Mã xác thực đã được gửi qua email",
    });
  } else {
    res.status(400).json({ message: "Không thể tạo người dùng" });
  }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    if (!user.isVerified) {
      return res.status(400).json({ message: "Tài khoản chưa được xác thực" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
  }
};

// Xác thực tài khoản bằng mã từ email
const verifyUser = async (req, res) => {
  const { email, verificationCode } = req.body;

  const user = await User.findOne({ email });

  if (user && user.verificationCode === verificationCode) {
    user.isVerified = true;
    await user.save();
    res.json({ message: "Tài khoản đã được xác thực thành công!" });
  } else {
    res.status(400).json({ message: "Mã xác thực không chính xác" });
  }
};
// Xoá tất cả người dùng
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({}); // Xóa tất cả các tài khoản người dùng
    res.json({ message: "Tất cả tài khoản người dùng đã bị xóa" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa tài khoản người dùng", error });
  }
};

module.exports = { registerUser, loginUser, verifyUser, deleteAllUsers };
