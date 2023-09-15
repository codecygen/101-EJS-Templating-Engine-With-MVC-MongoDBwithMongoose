// Mongoose-Queries
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    productDesc: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productImg: {
      type: String,
      required: true,
    },

    adminId: { 
        type: mongoose.Types.ObjectId,
        // ref creates a relationship with UserTable
        ref: "UserTable",
        required: true,
    },
  },
  { collection: "ProductTable" }
);

module.exports = mongoose.model("ProductTable", productSchema);