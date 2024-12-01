const { Router } = require("express");
const {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword,
  PaymentBalance,
  avtiveProfile,
} = require("../controllers/auth.controller");
const router = Router();
const { protect } = require("../middlewares/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/update", protect, updateProfile);
router.put("/updatepassword", protect, updatePassword);
router.put("/payment", protect, PaymentBalance);
router.put("/activate", protect, avtiveProfile);
module.exports = router;
