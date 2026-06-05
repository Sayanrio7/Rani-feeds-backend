const express = require("express");
const router = express.Router();
const ProductController = require("../controller/productController");
const upload = require("../middleware/upload");

router.post(
  "/create",

  upload.fields([
    {
      name: "productImages",
      maxCount: 5,
    },

    {
      name: "sizeCardImages",
      maxCount: 20,
    },
  ]),

  ProductController.create,
);
router.put(
  "/update/:id",

  upload.fields([
    {
      name: "productImages",
      maxCount: 5,
    },

    {
      name: "sizeCardImages",
      maxCount: 20,
    },
  ]),

  ProductController.update,
);
router.get("/get-all", ProductController.fetchAll);
router.get("/get/:id", ProductController.fetchById);
router.get("/category/:categoryId", ProductController.getProductsByCategory);
router.delete("/delete/:id", ProductController.deleteById);

module.exports = router;
