const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Middleware để cập nhật trường active trước khi lưu
exports.updateActiveStatus = function (next) {
  this.active = this.emailVerified || this.phoneVerified; // Active nếu email hoặc phone được xác minh
  next();
};

// Middleware để mã hóa mật khẩu trước khi lưu
exports.hashPassword = async function (next) {
  if (!this.isModified("password")) return next(); // Bỏ qua nếu password không được thay đổi
  const salt = await bcrypt.genSalt(10); // Tạo salt cho mật khẩu
  this.password = await bcrypt.hash(this.password, salt); // Hash mật khẩu
  next();
};

// Phương thức so sánh mật khẩu
exports.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // So sánh mật khẩu đã nhập
};

// Phương thức tạo mã OTP cho xác thực hai yếu tố
exports.generateTwoFactorCode = function () {
  const code = crypto.randomBytes(3).toString("hex"); // Mã ngẫu nhiên (6 ký tự hex)
  this.twoFactorCode = code;
  this.twoFactorExpires = Date.now() + 10 * 60 * 1000; // Hết hạn trong 10 phút
  return code;
};

// Phương thức kiểm tra mã OTP
exports.verifyTwoFactorCode = function (code) {
  if (this.twoFactorExpires < Date.now()) return false; // Kiểm tra mã OTP có hết hạn không
  return this.twoFactorCode === code; // So sánh mã OTP
};

// Phương thức tạo mã xác minh email hoặc phone
exports.generateVerificationCode = function () {
  const code = crypto.randomBytes(3).toString("hex"); // Tạo mã xác minh
  this.verificationCode = code;
  return code;
};
