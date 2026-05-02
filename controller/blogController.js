const Blog = require("../model/blog");
const fs = require("fs").promises;
const path = require("path");

module.exports = class BlogController {

  // ================= CREATE =================
  static create = async (req, res) => {
    const file = req.file;

    try {
      const { title, excerpt, content, category, author } = req.body;

      if (!title || !content) {
        throw new Error("Title and content are required");
      }

      if (!file) {
        throw new Error("Image is required");
      }

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      const imageUrl = baseUrl + file.filename;

      const data = {
        title,
        excerpt,
        content,
        category,
        author,
        slug: req.body.slug,
        image: imageUrl,
      };

      const result = await Blog.create(data);

      return res.status(201).json({
        success: true,
        message: "Blog created successfully",
        data: result,
      });

    } catch (err) {

      // ❌ cleanup upload
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

      const existing = await Blog.findById(id);
      if (!existing) throw new Error("Blog not found");

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      let imageUrl = existing.image;

      // 🔁 replace image
      if (file) {
        imageUrl = baseUrl + file.filename;

        // delete old image
        if (existing.image) {
          const oldFile = path.basename(existing.image);
          const filePath = path.join(process.cwd(), "uploads", oldFile);
          await fs.unlink(filePath).catch(() => {});
        }
      }

      existing.title = req.body.title || existing.title;
      existing.excerpt = req.body.excerpt || existing.excerpt;
      existing.content = req.body.content || existing.content;
      existing.category = req.body.category || existing.category;
      existing.author = req.body.author || existing.author;
      existing.slug = req.body.slug || existing.slug;
      existing.status = req.body.status || existing.status;
      existing.image = imageUrl;

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: existing,
      });

    } catch (err) {

      // ❌ cleanup new upload
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

  // ================= DELETE =================
  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;

      const blog = await Blog.findById(id);
      if (!blog) throw new Error("Blog not found");

      // delete image
      if (blog.image) {
        const filename = path.basename(blog.image);
        const filePath = path.join(process.cwd(), "uploads", filename);
        await fs.unlink(filePath).catch(() => {});
      }

      await Blog.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
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
      const result = await Blog.find().sort({ createdAt: -1 });

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

      const result = await Blog.findById(id);
      if (!result) throw new Error("Blog not found");

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
};