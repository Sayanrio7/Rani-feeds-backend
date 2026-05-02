const Enquiry = require("../model/enquiry");
const Product = require("../model/product");

module.exports = class EnquiryController {
  // ================= CREATE =================
  static create = async (req, res) => {
    try {
      const { name, phone, productId, subject } = req.body;

      if (!name || !phone || !subject) {
        throw new Error("Name, phone and subject are required");
      }

      const subjectsRequiringProduct = ["Product Inquiry", "Bulk Order"];

      if (subjectsRequiringProduct.includes(subject) && !productId) {
        throw new Error("Product is required for this subject");
      }

      let product = null;
      if (productId) {
        product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");
      }

      const data = {
        name,
        phone,
        subject,
        productId: productId || null,
        message: req.body.message,
        location: req.body.location,
      };

      const result = await Enquiry.create(data);

      return res.status(201).json({
        success: true,
        message: "Enquiry submitted successfully",
        data: result,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  // ================= GET ALL =================
  static fetchAll = async (req, res) => {
    try {
      const result = await Enquiry.find()
        .populate("productId")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  // ================= UPDATE STATUS =================
  static updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const enquiry = await Enquiry.findById(id);
      if (!enquiry) throw new Error("Enquiry not found");

      enquiry.status = status || enquiry.status;
      await enquiry.save();

      return res.status(200).json({
        success: true,
        message: "Status updated",
        data: enquiry,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  // ================= DELETE =================
  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;

      const enquiry = await Enquiry.findById(id);
      if (!enquiry) throw new Error("Enquiry not found");

      await Enquiry.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Enquiry deleted",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
};
