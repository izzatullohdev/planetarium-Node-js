const { Router } = require("express");
const router = Router();
const {
  getAllStars,
  createNewStar,
  getStarById,
  updatedStar,
  deleteStar,
} = require("../controllers/star.controller");
const upload = require("../utils/fileUpload");
const { protect, adminAccess, apiKeyAccess } = require("../middlewares/auth");

/**
 * @swagger
 * /stars:
 *   get:
 *     summary: Barcha yulduzlarni olish
 *     description: Yulduzlarni olish uchun api endpoint
 *     responses:
 *       200:
 *         description: Barcha yulduzlar muvaffaqiyatli qaytarildi
 *       401:
 *         description: Avtorizatsiya uchun token kerak
 *       500:
 *         description: Xatolik yuz berdi
 */
router.get("/", apiKeyAccess, getAllStars);

/**
 * @swagger
 * /stars:
 *   post:
 *     summary: Yangi yulduz yaratish
 *     description: Yangi yulduz yaratish uchun kerakli ma'lumotlarni yuboring
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Yulduz nomi
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Yulduz rasmi
 *     responses:
 *       201:
 *         description: Yangi yulduz muvaffaqiyatli yaratildi
 *       401:
 *         description: Avtorizatsiya uchun token kerak
 *       403:
 *         description: Admin huquqi kerak
 *       500:
 *         description: Xatolik yuz berdi
 */
router.post("/", protect, adminAccess, upload.single("image"), createNewStar);

/**
 * @swagger
 * /stars/{id}:
 *   get:
 *     summary: Yulduz IDsi orqali yulduzni olish
 *     description: ID bo'yicha yulduzni olish uchun api endpoint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yulduzning unikal IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Yulduz muvaffaqiyatli topildi
 *       404:
 *         description: Yulduz topilmadi
 *       500:
 *         description: Xatolik yuz berdi
 */
router.get("/:id", apiKeyAccess, getStarById);

/**
 * @swagger
 * /stars/{id}:
 *   put:
 *     summary: Yulduzni yangilash
 *     description: Yulduzni yangilash uchun kerakli ma'lumotlarni yuboring
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yulduzning unikal IDsi
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Yulduzning yangilangan nomi
 *               description:
 *                 type: string
 *                 description: Yulduzning tavsifi
 *     responses:
 *       200:
 *         description: Yulduz muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       404:
 *         description: Yulduz topilmadi
 *       500:
 *         description: Xatolik yuz berdi
 */
router.put("/:id", protect, adminAccess, updatedStar);

/**
 * @swagger
 * /stars/{id}:
 *   delete:
 *     summary: Yulduzni o'chirish
 *     description: Yulduzni o'chirish uchun ID ni yuboring
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yulduzning unikal IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Yulduz muvaffaqiyatli o'chirildi
 *       404:
 *         description: Yulduz topilmadi
 *       500:
 *         description: Xatolik yuz berdi
 */
router.delete("/:id", protect, adminAccess, deleteStar);

module.exports = router;
