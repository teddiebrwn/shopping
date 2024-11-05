const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Middleware để cập nhật trường active trước khi lưu
exports.updateActiveStatus = function (next) {
  this.active = this.emailVerified || this.phoneVerified; // Nếu email hoặc phone đã được xác minh thì active là true
  next();
};

// Middleware để mã hóa mật khẩu trước khi lưu
exports.hashPassword = async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
};

// Phương thức so sánh mật khẩu
exports.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Phương thức tạo mã OTP cho xác thực hai yếu tố
exports.generateTwoFactorCode = function () {
  const code = crypto.randomBytes(3).toString("hex");
  this.twoFactorCode = code;
  this.twoFactorExpires = Date.now() + 10 * 60 * 1000; // 10 phút
  return code;
};

// Phương thức kiểm tra mã OTP
exports.verifyTwoFactorCode = function (code) {
  if (this.twoFactorExpires < Date.now()) return false;
  return this.twoFactorCode === code;
};

// Phương thức để tạo mã xác minh
exports.generateVerificationCode = function () {
  const code = crypto.randomBytes(3).toString("hex");
  this.verificationCode = code;
  return code;
};
