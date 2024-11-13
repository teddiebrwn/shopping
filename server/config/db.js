const mongoose = require("mongoose");
const { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } = require("./envConfig");

const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_SERVER}/${DB_DATABASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected 🟢");
  } catch (error) {
    console.error("Error connecting to MongoDB 🔴:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
