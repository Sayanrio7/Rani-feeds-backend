const mongoose = require("../database/dbConnection");

module.exports = mongoose.model(
  "about",
  mongoose.Schema(
    {
      title: { type: String },
      description: { type: String },
      image: { type: String },
    },
    {
      timestamps: true,
    },
  ),
);
