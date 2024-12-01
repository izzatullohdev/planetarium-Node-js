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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Foydalanuvchini ro'yxatdan o'tkazish
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tkazildi.
 *       400:
 *         description: Noto'g'ri ma'lumotlar.
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchini tizimga kirish
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli kirish va token olish.
 *       401:
 *         description: Noto'g'ri login yoki parol.
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Foydalanuvchi profilini olish
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumotlari.
 *       401:
 *         description: Kirish huquqi yo'q.
 */
router.get("/profile", protect, getProfile);

/**
 * @swagger
 * /api/auth/update:
 *   put:
 *     summary: Foydalanuvchi profilini yangilash
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil muvaffaqiyatli yangilandi.
 *       400:
 *         description: Noto'g'ri ma'lumotlar.
 */
router.put("/update", protect, updateProfile);

/**
 * @swagger
 * /api/auth/updatepassword:
 *   put:
 *     summary: Foydalanuvchi parolini yangilash
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parol muvaffaqiyatli yangilandi.
 *       400:
 *         description: Noto'g'ri parol.
 */
router.put("/updatepassword", protect, updatePassword);

/**
 * @swagger
 * /api/auth/payment:
 *   put:
 *     summary: Foydalanuvchi balansini to'ldirish
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Balans muvaffaqiyatli yangilandi.
 *       400:
 *         description: Noto'g'ri summa.
 */
router.put("/payment", protect, PaymentBalance);

/**
 * @swagger
 * /api/auth/activate:
 *   put:
 *     summary: Foydalanuvchi profilini faollashtirish
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil muvaffaqiyatli faollashtirildi.
 *       400:
 *         description: Faollashtirishda xato.
 */
router.put("/activate", protect, avtiveProfile);

module.exports = router;
