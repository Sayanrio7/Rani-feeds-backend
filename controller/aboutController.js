const About = require("../model/about");
const fs = require("fs").promises;
const path = require("path");

module.exports = class AboutController {
  // ================= CREATE / UPDATE =================
  static save = async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!description) {
        throw new Error("Description is required");
      }

      let existing = await About.findOne();

      if (existing) {
        existing.title = title || existing.title;
        existing.description = description;

        await existing.save();

        return res.status(200).json({
          success: true,
          message: "About updated successfully",
          data: existing,
        });
      } else {
        const result = await About.create({
          title,
          description,
        });

        return res.status(201).json({
          success: true,
          message: "About created successfully",
          data: result,
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  static update = async (req, res) => {
    const file = req.file;

    try {
      const { id } = req.params;

      const existing = await About.findById(id);
      if (!existing) throw new Error("About not found");

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      let imageUrl = existing.image;

      if (file) {
        imageUrl = baseUrl + file.filename;

        if (existing.image) {
          const oldFile = path.basename(existing.image);
          const filePath = path.join(process.cwd(), "uploads", oldFile);
          await fs.unlink(filePath).catch(() => {});
        }
      }

      existing.title = req.body.title || existing.title;
      existing.description = req.body.description || existing.description;
      existing.image = imageUrl;

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "About updated successfully",
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

  // ================= GET =================
  static fetch = async (req, res) => {
    try {
      const result = await About.findOne();

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
};
