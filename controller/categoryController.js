const Category = require("../model/category");
const fs = require("fs").promises;
const path = require("path");

module.exports = class CategoryController {
  // ================= CREATE =================
  static create = async (req, res) => {
    const file = req.file;

    try {
      const { name, description } = req.body;

      if (!name) {
        throw new Error("Category name is required");
      }

      const slug = name.toLowerCase().replace(/\s+/g, "-");

      const exists = await Category.findOne({ slug });

      if (exists) {
        throw new Error("Category already exists");
      }

      let image = "";

      if (file) {
        const protocol = req.headers["x-forwarded-proto"] || req.protocol;

        image =
          protocol + "://" + req.get("host") + "/uploads/" + file.filename;
      }

      const data = {
        name,
        slug,
        description,
        image,
      };

      const result = await Category.create(data);

      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: result,
      });
    } catch (err) {
      if (file) {
        const filePath = path.join(process.cwd(), "uploads", file.filename);

        await fs.unlink(filePath).catch(() => {});
      }

      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  // ================= UPDATE =================
  static update = async (req, res) => {
    const file = req.file;

    try {
      const { id } = req.params;

      const existing = await Category.findById(id);

      if (!existing) {
        throw new Error("Category not found");
      }

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;

      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      if (file) {
        if (existing.image) {
          const filename = path.basename(existing.image);

          const filePath = path.join(process.cwd(), "uploads", filename);

          await fs.unlink(filePath).catch(() => {});
        }

        existing.image = baseUrl + file.filename;
      }

      if (req.body.name) {
        existing.name = req.body.name;

        existing.slug = req.body.name.toLowerCase().replace(/\s+/g, "-");
      }

      existing.description = req.body.description || existing.description;

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: existing,
      });
    } catch (err) {
      if (file) {
        const filePath = path.join(process.cwd(), "uploads", file.filename);

        await fs.unlink(filePath).catch(() => {});
      }

      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  // ================= GET ALL =================
  static fetchAll = async (req, res) => {
    try {
      const result = await Category.find({
        isActive: true,
      }).sort({ createdAt: -1 });

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

  // ================= GET BY ID =================
  static fetchById = async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Category.findById(id);

      if (!result) {
        throw new Error("Category not found");
      }

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

  // ================= DELETE =================
  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);

      if (!category) {
        throw new Error("Category not found");
      }

      if (category.image) {
        const filename = path.basename(category.image);

        const filePath = path.join(process.cwd(), "uploads", filename);

        await fs.unlink(filePath).catch(() => {});
      }

      await Category.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
};
