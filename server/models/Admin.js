const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Define Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // Username phải là duy nhất
    sparse: true, // Cho phép giá trị trống (nếu không cung cấp)
    required: function () {
      return !this.email && !this.phone; // Bắt buộc nếu không có email hoặc phone
    },
    match: [
      /^@[\w]+$/,
      "Username must start with @ and contain only letters and numbers",
    ], // Format validation
  },
  email: {
    type: String,
    unique: true, // Email phải là duy nhất
    sparse: true,
    required: function () {
      return !this.username && !this.phone; // Bắt buộc nếu không có username hoặc phone
    },
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Format validation
  },
  phone: {
    type: String,
    unique: true, // Số điện thoại phải là duy nhất
    sparse: true,
    required: function () {
      return !this.username && !this.email; // Bắt buộc nếu không có username hoặc email
    },
    match: [
      /^\+84\d{9,10}$/,
      "Phone number must start with +84 and be 10-11 digits",
    ], // Format validation
  },
  password: {
    type: String,
    required: [true, "Password is required"], // Bắt buộc
    minlength: [6, "Password must be at least 6 characters long"], // Độ dài tối thiểu
  },
  firstName: {
    type: String,
    required: [true, "First name is required"], // Bắt buộc
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"], // Bắt buộc
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"], // Bắt buộc
  },
  avatar: {
    type: String, // URL ảnh đại diện (nếu có)
  },
  address: {
    type: String, // Địa chỉ (không bắt buộc)
  },
  createdAt: {
    type: Date,
    default: Date.now, // Ngày tạo tài khoản
  },
  emailVerified: {
    type: Boolean,
    default: false, // Mặc định chưa xác thực email
  },
  phoneVerified: {
    type: Boolean,
    default: false, // Mặc định chưa xác thực số điện thoại
  },
  active: {
    type: Boolean,
    default: false, // Mặc định chưa active
  },
  verificationCode: {
    type: String, // Mã xác thực email/phone
  },
  twoFactorCode: String, // Mã xác thực hai yếu tố
  twoFactorExpires: Date, // Hạn sử dụng mã xác thực hai yếu tố
  role: {
    type: String,
    enum: ["admin", "superadmin"], // Chỉ chấp nhận giá trị admin hoặc superadmin
    default: "admin", // Mặc định là admin
  },
  permissions: {
    manageUsers: { type: Boolean, default: true },
    manageProducts: { type: Boolean, default: true },
    manageCategories: { type: Boolean, default: true },
  },
});

// Middleware - Hash mật khẩu trước khi lưu
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Nếu password không thay đổi, bỏ qua
  const salt = await bcrypt.genSalt(10); // Tạo salt
  this.password = await bcrypt.hash(this.password, salt); // Hash mật khẩu
  next();
});

// Middleware - Cập nhật trạng thái active
adminSchema.pre("save", function (next) {
  this.active = this.emailVerified || this.phoneVerified; // Active nếu email hoặc phone được xác minh
  next();
});

// Method - So sánh mật khẩu
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // So sánh mật khẩu đã nhập
};

// Method - Tạo mã OTP (Two-Factor Authentication)
adminSchema.methods.generateTwoFactorCode = function () {
  const code = crypto.randomBytes(3).toString("hex"); // Tạo mã ngẫu nhiên
  this.twoFactorCode = code;
  this.twoFactorExpires = Date.now() + 10 * 60 * 1000; // Mã có hạn trong 10 phút
  return code;
};

// Method - Kiểm tra mã OTP
adminSchema.methods.verifyTwoFactorCode = function (code) {
  if (this.twoFactorExpires < Date.now()) return false; // Mã hết hạn
  return this.twoFactorCode === code; // So sánh mã
};

// Method - Tạo mã xác minh email/phone
adminSchema.methods.generateVerificationCode = function () {
  const code = crypto.randomBytes(3).toString("hex");
  this.verificationCode = code;
  return code;
};

// Export Model
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
