const express = require("express");
const router = express.Router();
const GalleryController = require("../controller/galleryController");
const upload = require("../middleware/upload");

router.post("/create", upload.array("images", 10), GalleryController.create);
router.put("/update/:id", upload.array("images", 10), GalleryController.update);
router.get("/get-all", GalleryController.fetchAll);
router.delete("/delete/:id", GalleryController.deleteById);

module.exports = router;