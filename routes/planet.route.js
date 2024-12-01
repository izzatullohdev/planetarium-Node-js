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

/**
 * @swagger
 * /planets:
 *   get:
 *     summary: Barcha sayyoralarni olish
 *     description: Sayyoralarni olish uchun api endpoint
 *     responses:
 *       200:
 *         description: Barcha sayyoralar muvaffaqiyatli qaytarildi
 *       401:
 *         description: Avtorizatsiya uchun token kerak
 *       500:
 *         description: Xatolik yuz berdi
 */
router.get("/", apiKeyAccess, getAllPlanets);

/**
 * @swagger
 * /planets:
 *   post:
 *     summary: Yangi sayyora yaratish
 *     description: Yangi sayyora yaratish uchun kerakli ma'lumotlarni yuboring
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Sayyoraning nomi
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Sayyora rasmi
 *     responses:
 *       201:
 *         description: Yangi sayyora muvaffaqiyatli yaratildi
 *       401:
 *         description: Avtorizatsiya uchun token kerak
 *       403:
 *         description: Admin huquqi kerak
 *       500:
 *         description: Xatolik yuz berdi
 */
router.post("/", protect, adminAccess, upload.single("image"), createPlanet);

/**
 * @swagger
 * /planets/{id}:
 *   get:
 *     summary: Sayyora IDsi orqali sayyorani olish
 *     description: ID bo'yicha sayyorani olish uchun api endpoint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sayyoraning unikal IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sayyora muvaffaqiyatli topildi
 *       404:
 *         description: Sayyora topilmadi
 *       500:
 *         description: Xatolik yuz berdi
 */
router.get("/:id", apiKeyAccess, getPlanetsById);

/**
 * @swagger
 * /planets/{id}:
 *   put:
 *     summary: Sayyorani yangilash
 *     description: Sayyorani yangilash uchun kerakli ma'lumotlarni yuboring
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sayyoraning unikal IDsi
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
 *                 description: Sayyoraning yangilangan nomi
 *               description:
 *                 type: string
 *                 description: Sayyoraning yangilangan tavsifi
 *     responses:
 *       200:
 *         description: Sayyora muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot
 *       404:
 *         description: Sayyora topilmadi
 *       500:
 *         description: Xatolik yuz berdi
 */
router.put("/:id", protect, adminAccess, updatedPlanet);

/**
 * @swagger
 * /planets/{id}:
 *   delete:
 *     summary: Sayyorani o'chirish
 *     description: Sayyorani o'chirish uchun ID ni yuboring
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sayyoraning unikal IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sayyora muvaffaqiyatli o'chirildi
 *       404:
 *         description: Sayyora topilmadi
 *       500:
 *         description: Xatolik yuz berdi
 */
router.delete("/:id", protect, adminAccess, deletePlanet);

module.exports = router;
