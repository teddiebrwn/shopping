const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Define Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true,
    required: function () {
      return !this.email && !this.phone;
    },
    match: [
      /^@[\w]+$/,
      "Username must start with @ and contain only letters and numbers",
    ],
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    required: function () {
      return !this.username && !this.phone;
    },
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    required: function () {
      return !this.username && !this.email;
    },
    match: [
      /^\+84\d{9,10}$/,
      "Phone number must start with +84 and be 10-11 digits",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
  },
  twoFactorCode: String,
  twoFactorExpires: Date,
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin",
  },
  permissions: {
    manageUsers: { type: Boolean, default: true },
    manageProducts: { type: Boolean, default: true },
    manageCategories: { type: Boolean, default: true },
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.pre("save", function (next) {
  this.active = this.emailVerified || this.phoneVerified;
  next();
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.methods.generateTwoFactorCode = function () {
  const code = crypto.randomBytes(3).toString("hex");
  this.twoFactorExpires = Date.now() + 10 * 60 * 1000;
  return code;
};

adminSchema.methods.verifyTwoFactorCode = function (code) {
  if (this.twoFactorExpires < Date.now()) return false;
  return this.twoFactorCode === code;
};

adminSchema.methods.generateVerificationCode = function () {
  const code = crypto.randomBytes(3).toString("hex");
  this.verificationCode = code;
  return code;
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
