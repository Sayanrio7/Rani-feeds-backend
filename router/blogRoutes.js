const express = require("express");
const router = express.Router();
const BlogController = require("../controller/blogController");
const upload = require("../middleware/upload");

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog Management APIs
 */

/**
 * @swagger
 * /api/blogs/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Benefits of Quality Fish Feed
 *               description:
 *                 type: string
 *                 example: Detailed blog content...
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
router.post("/create", upload.single("image"), BlogController.create);

/**
 * @swagger
 * /api/blogs/update/{id}:
 *   put:
 *     summary: Update blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
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
 *         description: Blog updated successfully
 */
router.put("/update/:id", upload.single("image"), BlogController.update);

/**
 * @swagger
 * /api/blogs/get-all:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Blogs fetched successfully
 */
router.get("/get-all", BlogController.fetchAll);

/**
 * @swagger
 * /api/blogs/get/{id}:
 *   get:
 *     summary: Get blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog details fetched successfully
 */
router.get("/get/:id", BlogController.fetchById);

/**
 * @swagger
 * /api/blogs/delete/{id}:
 *   delete:
 *     summary: Delete blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
router.delete("/delete/:id", BlogController.deleteById);

module.exports = router;