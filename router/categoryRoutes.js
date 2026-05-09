const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categoryController");
const upload = require("../middleware/upload");

router.post("/create", upload.single("image"), CategoryController.create);
router.put("/update/:id", upload.single("image"), CategoryController.update);
router.get("/get-all", CategoryController.fetchAll);
router.get("/get/:id", CategoryController.fetchById);
router.delete("/delete/:id", CategoryController.deleteById);

module.exports = router;
