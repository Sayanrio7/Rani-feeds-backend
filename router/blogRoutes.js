const express = require("express");
const router = express.Router();
const BlogController = require("../controller/blogController");
const upload = require("../middleware/upload");

router.post("/create", upload.single("image"), BlogController.create);
router.put("/update/:id", upload.single("image"), BlogController.update);
router.get("/get-all", BlogController.fetchAll);
router.get("/get/:id", BlogController.fetchById);
router.delete("/delete/:id", BlogController.deleteById);

module.exports = router;