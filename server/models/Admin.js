const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const adminMiddleware = require("../middlewares/adminMiddleware");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true,
    match: [/^@[\w]+$/, "Username must start with @"],
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    match: [
      /^\+84\d{9,10}$/,
      "Phone number must start with +84 and be 10-11 digits",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
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
// Apply middleware
adminSchema.pre("save", adminMiddleware.updateActiveStatus);
adminSchema.pre("save", adminMiddleware.hashPassword);

// Add method to middleware
adminSchema.methods.matchPassword = adminMiddleware.matchPassword;
adminSchema.methods.generateTwoFactorCode =
  adminMiddleware.generateTwoFactorCode;
adminSchema.methods.verifyTwoFactorCode = adminMiddleware.verifyTwoFactorCode;
adminSchema.methods.generateVerificationCode =
  adminMiddleware.generateVerificationCode;

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
