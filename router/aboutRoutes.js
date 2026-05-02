const express = require("express");
const router = express.Router();
const AboutController = require("../controller/aboutController");
const upload = require("../middleware/upload");

router.post("/save", upload.single("image"), AboutController.save);
router.put("/update/:id", upload.single("image"), AboutController.update);
router.get("/get", AboutController.fetch);

module.exports = router;