const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log(`Database is connected`);
  } catch (error) {
    console.error(`Error in connecting DB: ${error}`);
  }
};

module.exports = connectDB;
