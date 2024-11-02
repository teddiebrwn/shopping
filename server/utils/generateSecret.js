const crypto = require("crypto");

// Tạo JWT Secret ngẫu nhiên
const generateRandomSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

module.exports = generateRandomSecret;
