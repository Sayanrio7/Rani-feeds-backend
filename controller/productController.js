const Product = require("../model/product");
const fs = require("fs").promises;
const path = require("path");

module.exports = class ProductController {
  static create = async (req, res) => {
    const files = req.files;

    try {
      const { name } = req.body;

      if (!name) {
        throw new Error("Product name is required");
      }

      const productImages = files?.productImages || [];

      if (productImages.length === 0) {
        throw new Error("At least one product image is required");
      }

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;

      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      // PRODUCT IMAGES
      const imageUrls = productImages.map((file) => baseUrl + file.filename);

      // SIZE CARDS
      const sizeCardsData = req.body.sizeCards
        ? JSON.parse(req.body.sizeCards)
        : [];

      const sizeCardImages = files?.sizeCardImages || [];

      const finalSizeCards = sizeCardsData.map((card, index) => ({
        title: card.title,
        image: sizeCardImages[index]
          ? baseUrl + sizeCardImages[index].filename
          : "",
      }));

      const data = {
        name,

        category: req.body.category,

        bagWeight: req.body.bagWeight,

        sizeOptions: req.body.sizeOptions
          ? JSON.parse(req.body.sizeOptions)
          : [],

        description: req.body.description,

        benefits: req.body.benefits ? JSON.parse(req.body.benefits) : [],

        ingredients: req.body.ingredients
          ? JSON.parse(req.body.ingredients)
          : [],

        images: imageUrls,

        sizeCards: finalSizeCards,
      };

      const result = await Product.create(data);

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: result,
      });
    } catch (err) {
      // DELETE UPLOADED FILES IF ERROR
      if (files) {
        const allFiles = [
          ...(files.productImages || []),
          ...(files.sizeCardImages || []),
        ];

        await Promise.all(
          allFiles.map(async (file) => {
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

      const existing = await Product.findById(id);

      if (!existing) throw new Error("Product not found");

      const protocol = req.headers["x-forwarded-proto"] || req.protocol;

      const baseUrl = protocol + "://" + req.get("host") + "/uploads/";

      // PRODUCT IMAGES UPDATE
      if (files?.productImages && files.productImages.length > 0) {
        await Promise.all(
          existing.images.map(async (img) => {
            const filename = path.basename(img);

            const filePath = path.join(process.cwd(), "uploads", filename);

            await fs.unlink(filePath).catch(() => {});
          }),
        );

        existing.images = files.productImages.map(
          (file) => baseUrl + file.filename,
        );
      }

      // SIZE CARD UPDATE
      if (req.body.sizeCards) {
        // DELETE OLD CARD IMAGES
        await Promise.all(
          existing.sizeCards.map(async (card) => {
            const filename = path.basename(card.image);

            const filePath = path.join(process.cwd(), "uploads", filename);

            await fs.unlink(filePath).catch(() => {});
          }),
        );

        const sizeCardsData = JSON.parse(req.body.sizeCards);

        const sizeCardImages = files?.sizeCardImages || [];

        existing.sizeCards = sizeCardsData.map((card, index) => ({
          title: card.title,
          image: sizeCardImages[index]
            ? baseUrl + sizeCardImages[index].filename
            : "",
        }));
      }

      existing.name = req.body.name || existing.name;

      existing.bagWeight = req.body.bagWeight || existing.bagWeight;

      existing.description = req.body.description || existing.description;

      if (req.body.sizeOptions) {
        existing.sizeOptions = JSON.parse(req.body.sizeOptions);
      }

      if (req.body.benefits) {
        existing.benefits = JSON.parse(req.body.benefits);
      }

      if (req.body.ingredients) {
        existing.ingredients = JSON.parse(req.body.ingredients);
      }

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: existing,
      });
    } catch (err) {
      if (files) {
        const allFiles = [
          ...(files.productImages || []),
          ...(files.sizeCardImages || []),
        ];

        await Promise.all(
          allFiles.map(async (file) => {
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

  static fetchAll = async (req, res) => {
    try {
      const result = await Product.find({
        isActive: true,
      }).populate("category");

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

  static getProductsByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;

      const result = await Product.find({
        category: categoryId,
        isActive: true,
      }).populate("category");

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

  static fetchById = async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Product.findById(id).populate("category");
      if (!result) throw new Error("Product not found");

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

  static deleteById = async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);

      if (!product) {
        throw new Error("Product not found");
      }

      // DELETE PRODUCT IMAGES
      await Promise.all(
        product.images.map(async (img) => {
          const filename = path.basename(img);

          const filePath = path.join(process.cwd(), "uploads", filename);

          await fs.unlink(filePath).catch(() => {});
        }),
      );

      // DELETE SIZE CARD IMAGES
      await Promise.all(
        product.sizeCards.map(async (card) => {
          const filename = path.basename(card.image);

          const filePath = path.join(process.cwd(), "uploads", filename);

          await fs.unlink(filePath).catch(() => {});
        }),
      );

      await Product.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
};
