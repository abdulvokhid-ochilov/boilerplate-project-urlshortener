require("dotenv").config();
const mongoose = require("mongoose");
// const config = require("config");
// const db = config.get('mongoURI');
const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
