const Star = require("../models/star.model");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Planet = require("../models/planet.model");

// @desc     Get all planets
// @route   GET /api/v1/stars/:id/planets
// @access  Public
exports.getAllPlanets = asyncHandler(async (req, res, next) => {
  const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 10;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit || pageLimit);
  const total = await Planet.countDocuments();
  const planets = await Planet.find()
    .skip(page * limit - limit)
    .limit(limit);
  res.status(200).json({
    success: true,
    count: planets.length,
    pageCount: Math.ceil(page / limit),
    currentPage: page,
    nextPage: Math.ceil(total / limit) < page + 1 ? null : page + 1,
    data: planets,
  });
});

// @desc     Create new planet
// @route    POST /api/v1/stars/:id/planets
// @access   Private / Admin
exports.createPlanet = asyncHandler(async (req, res, next) => {
  const star = await Star.findOne({ name: req.body.star });
  const newPlanet = await Planet.create({
    name: req.body.name,
    distanceToStar: req.body.distanceToStar,
    diametr: req.body.diametr,
    yearDuration: req.body.yearDuration,
    dayDuration: req.body.dayDuration,
    satellites: req.body.satellites,
    temperature: req.body.temperature,
    sequenceNumber: req.body.sequenceNumber,
    image: "uploads/" + req.file.filename,
    star: star._id,
  });

  await Star.findOneAndUpdate(
    { name: req.body.star },
    { $push: { planets: newPlanet._id } },
    { new: true, upsert: true }
  );

  res.status(201).json({
    success: true,
    data: newPlanet,
  });
});

// @desc     Get all planets by Id
// @route   GET /api/v1/stars/:id/planets
// @access  Public
exports.getPlanetsById = asyncHandler(async (req, res, next) => {
  const planetsById = await Planet.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: planetsById,
  });
});

// @desc     Update Planet
// @route    PUT /api/v1/planets/:id
// @access   Private / Admin
exports.updatedPlanet = asyncHandler(async (req, res, next) => {
  const planet = await Planet.findById(req.params.id);

  if (!planet) {
    return res.status(404).json({
      success: false,
      message: "Star not found",
    });
  }

  const editedStar = {
    name: req.body.name || planet.name,
    distanceToStar: req.body.distanceToStar || planet.distanceToStar,
    diametr: req.body.diametr || planet.diametr,
    yearDuration: req.body.yearDuration || planet.yearDuration,
    dayDuration: req.body.dayDuration || planet.dayDuration,
    satellites: req.body.satellites || planet.satellites,
    temperature: req.body.temperature || planet.temperature,
    sequenceNumber: req.body.sequenceNumber || planet.sequenceNumber,
  };

  const updatedPlanet = await Planet.findByIdAndUpdate(
    req.params.id,
    editedStar,
    {
      new: true, // Yangilangan hujjatni qaytaradi
      runValidators: true, // Validatsiyani qayta ishlatadi
    }
  );

  res.status(200).json({
    success: true,
    data: updatedPlanet,
  });
});

// @desc     Delete Planet
// @route    DELETE /api/v1/planets/:id
// @access   Private / Admin
exports.deletePlanet = asyncHandler(async (req, res, next) => {
  await Planet.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
    message: "Planet deleted",
  });
});
