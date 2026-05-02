const mongoose = require("../database/dbConnection");

module.exports = mongoose.model(
  "product",
  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        default: "Fish Feed",
      },
      protein: {
        type: String,
      },
      sizeOptions: [
        {
          type: String,
        },
      ],
      description: {
        type: String,
      },
      benefits: [
        {
          type: String,
        },
      ],
      images: [
        {
          type: String,
        },
      ],
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);
