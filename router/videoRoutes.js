const express = require("express");
const router = express.Router();

const VideoController = require("../controller/videoController");

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video Management APIs
 */

/**
 * @swagger
 * /api/videos/create:
 *   post:
 *     summary: Create a new video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fish Farming Tips
 *               videoUrl:
 *                 type: string
 *                 example: https://youtube.com/watch?v=xxxx
 *     responses:
 *       201:
 *         description: Video created successfully
 */
router.post("/create", VideoController.create);

/**
 * @swagger
 * /api/videos/get-all:
 *   get:
 *     summary: Get all videos
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: Videos fetched successfully
 */
router.get("/get-all", VideoController.fetchAll);

/**
 * @swagger
 * /api/videos/update/{id}:
 *   put:
 *     summary: Update video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Video updated successfully
 */
router.put("/update/:id", VideoController.update);

/**
 * @swagger
 * /api/videos/delete/{id}:
 *   delete:
 *     summary: Delete video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *     responses:
 *       200:
 *         description: Video deleted successfully
 */
router.delete("/delete/:id", VideoController.deleteById);

module.exports = router;