const mongoose = require("../database/dbConnection");

module.exports = mongoose.model(
  "category",
  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
      },

      image: {
        type: String,
      },

      description: {
        type: String,
      },

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
