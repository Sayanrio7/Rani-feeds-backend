const express = require("express");
const router = express.Router();
const ProductController = require("../controller/productController");
const upload = require("../middleware/upload");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management APIs
 */

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               productImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               sizeCardImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post(
  "/create",
  upload.fields([
    {
      name: "productImages",
      maxCount: 5,
    },
    {
      name: "sizeCardImages",
      maxCount: 20,
    },
  ]),
  ProductController.create,
);

/**
 * @swagger
 * /api/products/update/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               productImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               sizeCardImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put(
  "/update/:id",
  upload.fields([
    {
      name: "productImages",
      maxCount: 5,
    },
    {
      name: "sizeCardImages",
      maxCount: 20,
    },
  ]),
  ProductController.update,
);

/**
 * @swagger
 * /api/products/get-all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/get-all", ProductController.fetchAll);

/**
 * @swagger
 * /api/products/get/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 */
router.get("/get/:id", ProductController.fetchById);

/**
 * @swagger
 * /api/products/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Products belonging to a category
 */
router.get("/category/:categoryId", ProductController.getProductsByCategory);

/**
 * @swagger
 * /api/products/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/delete/:id", ProductController.deleteById);

module.exports = router;