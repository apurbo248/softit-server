const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },

  { timestamps: true }
);

const Product = mongoose.model("softitProduct", productSchema);
module.exports = Product;
