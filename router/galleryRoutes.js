const express = require("express");
const router = express.Router();
const GalleryController = require("../controller/galleryController");
const upload = require("../middleware/upload");

/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Gallery Management APIs
 */

/**
 * @swagger
 * /api/gallery/create:
 *   post:
 *     summary: Create gallery images
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Gallery created successfully
 */
router.post(
  "/create",
  upload.array("images", 10),
  GalleryController.create
);

/**
 * @swagger
 * /api/gallery/update/{id}:
 *   put:
 *     summary: Update gallery images
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gallery ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Gallery updated successfully
 */
router.put(
  "/update/:id",
  upload.array("images", 10),
  GalleryController.update
);

/**
 * @swagger
 * /api/gallery/get-all:
 *   get:
 *     summary: Get all gallery images
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: Gallery list fetched successfully
 */
router.get("/get-all", GalleryController.fetchAll);

/**
 * @swagger
 * /api/gallery/delete/{id}:
 *   delete:
 *     summary: Delete gallery item
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gallery ID
 *     responses:
 *       200:
 *         description: Gallery item deleted successfully
 */
router.delete("/delete/:id", GalleryController.deleteById);

module.exports = router;