const express = require("express");
const router = express.Router();

const EnquiryController = require("../controller/enquiryController");

/**
 * @swagger
 * tags:
 *   name: Enquiries
 *   description: Customer Enquiry Management APIs
 */

/**
 * @swagger
 * /api/enquiry/create:
 *   post:
 *     summary: Create a new enquiry
 *     tags: [Enquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - name
 *               - phone
 *     responses:
 *       201:
 *         description: Enquiry submitted successfully
 */
router.post("/create", EnquiryController.create);

/**
 * @swagger
 * /api/enquiry/get-all:
 *   get:
 *     summary: Get all enquiries
 *     tags: [Enquiries]
 *     responses:
 *       200:
 *         description: List of enquiries
 */
router.get("/get-all", EnquiryController.fetchAll);

/**
 * @swagger
 * /api/enquiry/update-status/{id}:
 *   put:
 *     summary: Update enquiry status
 *     tags: [Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enquiry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: Contacted
 *     responses:
 *       200:
 *         description: Enquiry status updated successfully
 */
router.put("/update-status/:id", EnquiryController.updateStatus);

/**
 * @swagger
 * /api/enquiry/delete/{id}:
 *   delete:
 *     summary: Delete enquiry
 *     tags: [Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enquiry ID
 *     responses:
 *       200:
 *         description: Enquiry deleted successfully
 */
router.delete("/delete/:id", EnquiryController.deleteById);

module.exports = router;