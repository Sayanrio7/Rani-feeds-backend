const mongoose = require("../database/dbConnection");

module.exports = mongoose.model(
  "gallery",
  mongoose.Schema(
    {
      title: {
        type: String,
      },
      images: [
        {
          type: String,
          required: true,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);