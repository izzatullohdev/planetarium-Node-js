const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // To'ldrish majburiy bo'lishi uchun true qilib olish
    },
    email: {
      type: String,
      required: true,
      unique: true, // Takrorlanmasligi uchun true qilib olish
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    adminStatus: {
      type: Boolean,
      default: false,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// hashing password with bcrypt
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
// Generete jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};
// refresh tokent
userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    }
  );
};
// compare password with bcrypt
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", userSchema);
