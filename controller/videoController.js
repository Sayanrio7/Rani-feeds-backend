const Video = require("../model/video");

module.exports = class VideoController {

  // ================= CREATE =================
  static create = async (req, res) => {
    try {
      const { title, url } = req.body;

      if (!title || !url) {
        throw new Error("Title and URL are required");
      }

      const result = await Video.create({ title, url });

      return res.status(201).json({
        success: true,
        message: "Video added successfully",
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
      const result = await Video.find().sort({ createdAt: -1 });

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

  // ================= UPDATE =================
  static update = async (req, res) => {
    try {
      const { id } = req.params;

      const existing = await Video.findById(id);
      if (!existing) throw new Error("Video not found");

      existing.title = req.body.title || existing.title;
      existing.url = req.body.url || existing.url;

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Video updated successfully",
        data: existing,
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

      const video = await Video.findById(id);
      if (!video) throw new Error("Video not found");

      await Video.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Video deleted successfully",
      });

    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
};