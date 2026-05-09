const express = require("express");
const router = express.Router();
const ProductController = require("../controller/productController");
const upload = require("../middleware/upload");

router.post("/create", upload.array("images", 5), ProductController.create);
router.put("/update/:id", upload.array("images", 5), ProductController.update);
router.get("/get-all", ProductController.fetchAll);
router.get("/get/:id", ProductController.fetchById);
router.get("/category/:categoryId", ProductController.getProductsByCategory);
router.delete("/delete/:id", ProductController.deleteById);

module.exports = router;
