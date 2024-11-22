const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Tối đa 100 request mỗi IP
  message: "Too many requests from this IP, please try again later",
});

module.exports = limiter;
