const Gallery = require("../model/gallery");
const fs = require("fs").promises;
const path = require("path");

module.exports = class GalleryController {
  // ================= CREATE =================
  static create = async (req, res) => {
    const files = req.files;

    try {
      if (!files || files.length === 0) {
        throw new Error("At least one image is required");
      }

      if (files.length > 10) {
        throw new Error("Maximum 10 images allowed");
      }

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      const imageUrls = files.map((file) => baseUrl + file.filename);

      const data = {
        title: req.body.title,
        images: imageUrls,
      };

      const result = await Gallery.create(data);

      return res.status(201).json({
        success: true,
        message: "Gallery images added",
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

      const existing = await Gallery.findById(id);
      if (!existing) throw new Error("Gallery not found");

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      if (files && files.length > 0) {
        if (files.length > 10) {
          throw new Error("Maximum 10 images allowed");
        }
        await Promise.all(
          existing.images.map(async (img) => {
            const filename = path.basename(img);
            const filePath = path.join(process.cwd(), "uploads", filename);
            await fs.unlink(filePath).catch(() => {});
          }),
        );

        existing.images = files.map((file) => baseUrl + file.filename);
      }

      existing.title = req.body.title || existing.title;

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Gallery updated successfully",
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

  // ================= GET ALL =================
  static fetchAll = async (req, res) => {
    try {
      const result = await Gallery.find().sort({ createdAt: -1 });

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

  // ================= DELETE =================
  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;

      const gallery = await Gallery.findById(id);
      if (!gallery) throw new Error("Gallery not found");
      await Promise.all(
        gallery.images.map(async (img) => {
          const filename = path.basename(img);
          const filePath = path.join(process.cwd(), "uploads", filename);
          await fs.unlink(filePath).catch(() => {});
        }),
      );

      await Gallery.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Gallery deleted",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
};
