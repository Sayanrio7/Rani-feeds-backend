const mongoose = require("../database/dbConnection");

module.exports = mongoose.model(
  "blog",
  mongoose.Schema(
    {
      title: { type: String },
      excerpt: { type: String },
      content: { type: String },
      image: { type: String },
      category: { type: String },
      slug: { type: String },
      author: {
        type: String,
        default: "Rani Feeds Team",
      },
      status: {
        type: String,
        enum: ["draft", "published"],
        default: "published",
      },
    },
    {
      timestamps: true,
    },
  ),
);
