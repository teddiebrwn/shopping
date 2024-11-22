const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Middleware kiểm tra dữ liệu đầu vào
const validateRegister = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("birthday").isDate().withMessage("Birthday must be a valid date"),
  check("username")
    .matches(/^@[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username must start with '@' and contain only letters, numbers, and underscores"
    ),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must include at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must include at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must include at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must include at least one special character")
    .custom((password, { req }) => {
      if (
        password.includes(req.body.name) ||
        password.includes(req.body.username)
      ) {
        throw new Error("Password must not include your name or username");
      }
      return true;
    }),
  check("gender").notEmpty().withMessage("Gender is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("country").notEmpty().withMessage("Country is required"),
];

const validateLogin = [
  check("emailOrUsername")
    .notEmpty()
    .withMessage("Email or username is required")
    .custom((value, { req }) => {
      // Kiểm tra xem giá trị có phải là email hợp lệ không
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && !/^@[a-zA-Z0-9_]+$/.test(value)) {
        throw new Error("Invalid email or username");
      }
      return true;
    }),

  check("password").notEmpty().withMessage("Password is required"),
];

const validateResetPassword = [
  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must include at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must include at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must include at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must include at least one special character")
    .custom(async (newPassword, { req }) => {
      if (!req.user) {
        throw new Error("User is not authenticated");
      }

      const isPasswordSameAsOld = await bcrypt.compare(
        newPassword,
        req.user.password
      );
      if (isPasswordSameAsOld) {
        throw new Error("New password cannot be the same as the old password");
      }

      return true;
    }),

  check("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword !== req.body.newPassword) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateResetPassword,
  handleValidationErrors,
};
