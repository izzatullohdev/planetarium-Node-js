const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user.model");

// Himoya middleware
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  //Authorization: <type> <credeentials> Bearer exsakdasd.dfsdfdsf.sdfsdf
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ErrorResponse("Not adminAccessd to access this route"),
      401
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

// Muayyan rollarga kirishni ruxsat berish
exports.adminAccess = (req, res, next) => {
  if (!req.user.adminStatus) {
    return next(
      new ErrorResponse("This route can be access only admin status users", 403)
    );
  }
  next();
};

// API kaliti orqali himoya
exports.apiKeyAccess = asyncHandler(async (req, res, next) => {
  const key = req.headers["apikey"];

  // API kaliti mavjudligini tekshirish
  if (!key) {
    return next(new ErrorResponse("API kaliti kiritilmagan", 401));
  }

  const user = await User.findOne({ apiKey: key });

  // Foydalanuvchini topish va faolligini tekshirish
  if (!user) {
    return next(new ErrorResponse("Noto‘g‘ri API kaliti", 401));
  }

  if (!user.isActive) {
    return next(new ErrorResponse("API kaliti faolsiz", 403));
  }

  req.user = user;
  next();
});
