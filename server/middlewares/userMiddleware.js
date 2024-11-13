const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.updateActiveStatus = function (next) {
  this.active = this.emailVerified || this.phoneVerified;
};

exports.hashPassword = async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
};

exports.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

exports.generateTwoFactorCode = function () {
  const code = crypto.randomBytes(3).toString("hex");
  this.twoFactorCode = code;
  this.twoFactorExpires = Date.now() + 10 * 60 * 1000;
  return code;
};

exports.verifyTwoFactorCode = function (code) {
  if (this.twoFactorExpires < Date.now()) return false;
  return this.twoFactorCode === code;
};

exports.generateVerificationCode = function () {
  const code = crypto.randomBytes(3).toString("hex");
  this.verificationCode = code;
  return code;
};
