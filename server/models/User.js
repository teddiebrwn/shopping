const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userMiddleware = require("../middlewares/userMiddleware");

const userSchema = new mongoose.Schema({
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
});
userSchema.pre("save", userMiddleware.updateActiveStatus);
userSchema.pre("save", userMiddleware.hashPassword);
userSchema.methods.matchPassword = userMiddleware.matchPassword;
userSchema.methods.generateTwoFactorCode = userMiddleware.generateTwoFactorCode;
userSchema.methods.verifyTwoFactorCode = userMiddleware.verifyTwoFactorCode;
userSchema.methods.generateVerificationCode =
  userMiddleware.generateVerificationCode;

const User = mongoose.model("User", userSchema);
module.exports = User;
