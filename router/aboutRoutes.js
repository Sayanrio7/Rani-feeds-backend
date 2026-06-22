const express = require("express");
const router = express.Router();
const AboutController = require("../controller/aboutController");
const upload = require("../middleware/upload");

/**
 * @swagger
 * tags:
 *   name: About
 *   description: About Page Management APIs
 */

/**
 * @swagger
 * /api/about/save:
 *   post:
 *     summary: Create About page content
 *     tags: [About]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: About content saved successfully
 */
router.post("/save", upload.single("image"), AboutController.save);

/**
 * @swagger
 * /api/about/update/{id}:
 *   put:
 *     summary: Update About page content
 *     tags: [About]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: About Document ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: About content updated successfully
 */
router.put("/update/:id", upload.single("image"), AboutController.update);

/**
 * @swagger
 * /api/about/get:
 *   get:
 *     summary: Get About page content
 *     tags: [About]
 *     responses:
 *       200:
 *         description: About content fetched successfully
 */
router.get("/get", AboutController.fetch);

module.exports = router;