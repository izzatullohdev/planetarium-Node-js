require("dotenv").config(); // .env faylni yuklash
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const connecting = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected: ${connecting.connection.host}`.bgBlue);
  } catch (error) {
    console.error(`"Error connecting to MongoDB:", ${error.message}`.bgRed);
    process.exit(1); // Protsessni to'xtatish
  }
};

module.exports = connectDB;
