const Star = require("../models/star.model");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const path = require("path");
// @desc     Get all stars
// @route   GET /api/v1/stars
// @access  Public
exports.getAllStars = asyncHandler(async (req, res, next) => {
  const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 10;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit || pageLimit);
  const total = await Star.countDocuments();
  const stars = await Star.find()
    .skip(page * limit - limit)
    .limit(limit);
  res.status(200).json({
    count: planets.length,
    pageCount: Math.ceil(page / limit),
    currentPage: page,
    nextPage: Math.ceil(total / limit) < page + 1 ? null : page + 1,
    success: true,
    count: stars.length,
    data: stars,
  });
});

// @desc     Create new star
// @route    POST /api/v1/stars
// @access   Private / Admin
exports.createNewStar = asyncHandler(async (req, res, next) => {
  const { name, temperature, massa, diametr } = req.body;

  // Tekshirish: barcha maydonlar to'ldirilganmi
  if (!name || !temperature || !massa || !diametr) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Fayl mavjudligini tekshirish
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image file is required",
    });
  }

  // Faylning nisbiy yo'lini olish
  const imagePath = `/uploads/${req.file.filename}`;

  // Yangi yulduzni yaratish
  const newStar = await Star.create({
    name,
    temperature,
    massa,
    diametr,
    image: imagePath, // Rasmning nisbiy yo'li
  });

  // Javob qaytarish
  res.status(201).json({
    success: true,
    data: newStar,
  });
});

// @desc     Star detail for id
// @route   Get /api/v1/stars/:id
// @access  Private / with ApiKey
exports.getStarById = asyncHandler(async (req, res, next) => {
  const star = await Star.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: star,
  });
});

// @desc     Update star
// @route    PUT /api/v1/stars/:id
// @access   Private / Admin
exports.updatedStar = asyncHandler(async (req, res, next) => {
  const star = await Star.findById(req.params.id);

  if (!star) {
    return res.status(404).json({
      success: false,
      message: "Star not found",
    });
  }

  const editedStar = {
    name: req.body.name || star.name,
    temperature: req.body.temperature || star.temperature,
    massa: req.body.massa || star.massa,
    diametr: req.body.diametr || star.diametr,
  };

  const updatedStar = await Star.findByIdAndUpdate(req.params.id, editedStar, {
    new: true, // Yangilangan hujjatni qaytaradi
    runValidators: true, // Validatsiyani qayta ishlatadi
  });

  res.status(200).json({
    success: true,
    data: updatedStar,
  });
});

// @desc     Delete star
// @route    DELETE /api/v1/stars/:id
// @access   Private / Admin
exports.deleteStar = asyncHandler(async (req, res, next) => {
  await Star.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
    message: "Star deleted",
  });
});
