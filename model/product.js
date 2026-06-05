const mongoose = require("../database/dbConnection");

const sizeCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
  },
);

module.exports = mongoose.model(
  "product",
  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
      },

      protein: {
        type: String,
      },

      bagWeight: {
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

      ingredients: [
        {
          type: String,
        },
      ],

      images: [
        {
          type: String,
        },
      ],

      sizeCards: [sizeCardSchema],

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
