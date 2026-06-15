const mongoose = require("../database/dbConnection");

module.exports = mongoose.model(
  "enquiry",
  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      subject: {
        type: String,
        enum: [
          "General Inquiry",
          "Product Inquiry",
          "Order / Bulk Order",
          "Dealership",
          "Support",
        ],
        required: true,
      },
      message: {
        type: String,
      },
      location: {
        type: String,
      },
      status: {
        type: String,
        enum: ["new", "contacted", "closed"],
        default: "new",
      },
    },
    {
      timestamps: true,
    },
  ),
);
