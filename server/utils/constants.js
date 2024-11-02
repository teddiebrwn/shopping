const Constants = {
  DB_SERVER: process.env.DB_SERVER || "default_server_value", // Giá trị mặc định nếu biến môi trường không có
  DB_USER: process.env.DB_USER || "default_user_value",
  DB_PASSWORD: process.env.DB_PASSWORD || "default_password_value",
  DB_DATABASE: process.env.DB_DATABASE || "default_database_value",
};

module.exports = Constants;
