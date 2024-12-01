const { Router } = require("express");
const {
  getAllStars,
  createNewStar,
  getStarById,
  updatedStar,
  deleteStar,
} = require("../controllers/star.controller");
const upload = require("../utils/fileUpload");
const router = Router();
const { protect, adminAccess, apiKeyAccess } = require("../middlewares/auth");
router.get("/", apiKeyAccess, getAllStars);
router.post("/", protect, adminAccess, upload.single("image"), createNewStar);
router.get("/:id", apiKeyAccess, getStarById);
router.put("/:id", protect, adminAccess, updatedStar);
router.delete("/:id", protect, adminAccess, deleteStar);
module.exports = router;
