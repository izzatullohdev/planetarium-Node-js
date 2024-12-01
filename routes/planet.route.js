const { Router } = require("express");
const router = Router();
const {
  getAllPlanets,
  createPlanet,
  getPlanetsById,
  updatedPlanet,
  deletePlanet,
} = require("../controllers/planet.controller");
const { protect, adminAccess, apiKeyAccess } = require("../middlewares/auth");
const upload = require("../utils/fileUpload");
router.get("/", apiKeyAccess, getAllPlanets);
router.post("/", protect, adminAccess, upload.single("image"), createPlanet);
router.get("/:id", apiKeyAccess, getPlanetsById);
router.get("/:id", protect, adminAccess, updatedPlanet);
router.delete("/:id", protect, adminAccess, deletePlanet);
module.exports = router;
