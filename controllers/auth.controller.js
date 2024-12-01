const User = require("../models/user.model");
const uuid = require("uuid");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
// @desc Register new user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const apiKey = uuid.v4();
  const user = await User.create({ name, email, password, apiKey });
  const token = user.getJwtToken();
  res.status(201).json({
    success: true,
    data: user,
    token: token,
  });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //   Check for email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  const user = await User.findOne({ email });
  //   Check if user exists
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  //   Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  const token = user.getJwtToken();
  res.status(200).json({
    success: true,
    data: user,
    token: token,
  });
});

// @desc      Get profile user
// @route     GET /api/v1/auth/profile
// @access    Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update profile user
// @route     PUT /api/v1/auth/update
// @access    Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const editedUser = {
    name: req.body.name || user.name,
    email: req.body.email || user.email,
  };

  const upateUser = await User.findByIdAndUpdate(req.user._id, editedUser, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: upateUser,
  });
});

// @desc      Update profile user in Password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  // Checked current password
  const isMatch = await user.matchPassword(req.body.currentPassword);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  user.password = req.body.newPassword;
  await user.save();

  const token = user.getJwtToken();
  res.status(200).json({
    success: true,
    data: user,
    token: token,
  });
});

// @desc      Update profile balace
// @route     PUT /api/v1/auth/payment
// @access    Private
exports.PaymentBalance = asyncHandler(async (req, res, next) => {
  // Click Payme
  const user = await User.findById(req.user._id);

  const UpdateBalance = await User.findByIdAndUpdate(
    req.user._id,
    {
      balance: user.balance + req.body.payment,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: UpdateBalance,
  });
});

// @desc      Active Status
// @route     PUT /api/v1/auth/activate
// @access    Private
exports.avtiveProfile = asyncHandler(async (req, res, next) => {
  const apiCost = process.env.BALANCE;
  const user = await User.findById(req.user._id);
  if (user.balance < apiCost) {
    let balance = apiCost - user.balance;
    return next(
      new ErrorResponse(`Sizda yetarli balans mavjud emas ${balance}`, 401)
    );
  }
  await User.findByIdAndUpdate(
    req.user._id,
    {
      balance: user.balance - apiCost,
      isActive: true,
    },
    {
      new: true,
      newValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: "Your Profile SuccessFully Activated",
  });
});
