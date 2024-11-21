const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const generateVerificationCode = require("../utils/generateVerificationCode");
const hashPassword = require("../utils/hashPassword");
const generateResetToken = require("../utils/generateResetToken");
exports.register = async (req, res) => {
  const {
    name,
    email,
    birthday,
    username,
    password,
    role,
    gender,
    address,
    city,
    country,
  } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or username already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const { code, expiry } = generateVerificationCode();
    const newUser = new User({
      name,
      email,
      birthday,
      username,
      password: hashedPassword,
      role: role || "user",
      gender: gender || "other",
      address,
      city,
      country,
      verificationCode: code,
      verificationExpiry: expiry,
      isActive: false,
      isVerified: false,
    });
    await newUser.save();
    await sendMail(email, "verification", { code });
    res.status(201).json({
      message: "User registered successfully. Verification code sent to email.",
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.verify = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      user.verificationCode !== code ||
      !user.verificationExpiry ||
      user.verificationExpiry < new Date()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }
    user.verificationCode = "";
    user.verificationExpiry = null;
    user.isVerified = true;
    user.isActive = true;
    await user.save();
    res.status(200).json({
      message: "Verification successful. Your account is now active.",
    });
  } catch (error) {
    console.error("Error during verification:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isActive) {
      return res.status(403).json({
        message: "Account not verified. Please verify your account first.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    user.lastLogin = new Date();
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.requestPasswordReset = async (req, res) => {
  const { emailOrUsername } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { resetToken, resetExpiry } = generateResetToken();
    user.resetPasswordToken = await hashPassword(resetToken); // Hash token để bảo mật
    user.resetPasswordExpiry = resetExpiry;
    await user.save();
    await sendMail(user.email, "passwordReset", { resetToken });
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error during password reset request:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordExpiry: { $gt: new Date() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isTokenValid) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = "";
    user.resetPasswordExpiry = null;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error during password reset:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
