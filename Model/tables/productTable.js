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

// statics keyword creates a static function
productSchema.statics.adminProducts = async function (adminId) {
  try {
    const adminProducts = await this.find({adminId: adminId});
    return adminProducts;
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model("ProductTable", productSchema);
