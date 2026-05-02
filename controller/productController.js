const Product = require("../model/product");
const fs = require("fs").promises;
const path = require("path");

module.exports = class ProductController {
  static create = async (req, res) => {
    const files = req.files;

    try {
      const { name } = req.body;

      if (!name) {
        throw new Error("Product name is required");
      }

      if (!files || files.length === 0) {
        throw new Error("At least one image is required");
      }

      if (files.length > 5) {
        throw new Error("Maximum 5 images allowed");
      }

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      const imageUrls = files.map((file) => baseUrl + file.filename);

      const data = {
        name,
        category: "Fish Feed",
        protein: req.body.protein,
        sizeOptions: req.body.sizeOptions
          ? JSON.parse(req.body.sizeOptions)
          : [],
        description: req.body.description,
        benefits: req.body.benefits ? JSON.parse(req.body.benefits) : [],
        images: imageUrls,
      };

      const result = await Product.create(data);

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: result,
      });
    } catch (err) {
      if (files) {
        await Promise.all(
          files.map(async (file) => {
            const filePath = path.join(process.cwd(), "uploads", file.filename);
            await fs.unlink(filePath).catch(() => {});
          }),
        );
      }

      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  static update = async (req, res) => {
    const files = req.files;

    try {
      const { id } = req.params;

      const existing = await Product.findById(id);
      if (!existing) throw new Error("Product not found");

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      if (files && files.length > 0) {
        await Promise.all(
          existing.images.map(async (img) => {
            const filename = path.basename(img);
            const filePath = path.join(process.cwd(), "uploads", filename);
            await fs.unlink(filePath).catch(() => {});
          }),
        );

        existing.images = files.map((file) => baseUrl + file.filename);
      }

      existing.name = req.body.name || existing.name;
      existing.protein = req.body.protein || existing.protein;
      existing.description = req.body.description || existing.description;

      if (req.body.sizeOptions) {
        existing.sizeOptions = JSON.parse(req.body.sizeOptions);
      }

      if (req.body.benefits) {
        existing.benefits = JSON.parse(req.body.benefits);
      }

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: existing,
      });
    } catch (err) {
      if (files) {
        await Promise.all(
          files.map(async (file) => {
            const filePath = path.join(process.cwd(), "uploads", file.filename);
            await fs.unlink(filePath).catch(() => {});
          }),
        );
      }

      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  static fetchAll = async (req, res) => {
    try {
      const result = await Product.find({ isActive: true });

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

  static fetchById = async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Product.findById(id);
      if (!result) throw new Error("Product not found");

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  };

  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);
      if (!product) throw new Error("Product not found");

      await Promise.all(
        product.images.map(async (img) => {
          const filename = path.basename(img);
          const filePath = path.join(process.cwd(), "uploads", filename);
          await fs.unlink(filePath).catch(() => {});
        }),
      );

      await Product.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
};
