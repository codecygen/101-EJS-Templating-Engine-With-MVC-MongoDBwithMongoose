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
productSchema.statics.findAllProducts = async function () {
  let allProducts;

  try {
    allProducts = await this.find();
  } catch (err) {
    console.error(err);
  }

  return allProducts;
};

productSchema.statics.getSingleProduct = async function (productId) {
  let foundProduct;

  try {
    foundProduct = await this.findById(productId);
  } catch (err) {
    console.error(err);
  }

  return foundProduct;
};

productSchema.statics.adminProducts = async function (adminId) {
  try {
    const adminProducts = await this.find({ adminId: adminId });
    return adminProducts;
  } catch (err) {
    console.error(err);
  }
};

productSchema.statics.deleteProduct = async function (productId) {
  try {
    await this.findByIdAndDelete(productId);
  } catch (err) {
    console.error(err);
  }
};

productSchema.statics.createOrUpdateProduct = async function (
  productData,
  isNew = false
) {
  // Create a new product
  if (isNew) {
    const { productName, productDesc, productPrice, productImg, adminId } =
      productData;

    const productTable = new this({
      productName,
      productDesc,
      productPrice: parseInt(productPrice),
      productImg,
      adminId,
    });

    try {
      await productTable.save();
    } catch (err) {
      console.error(err);
    }

    return;
  }

  // Update the current product
  const { _id, productName, productDesc, productPrice, productImg, adminId } =
    productData;

  try {
    await this.findOneAndUpdate({ _id: _id }, productData, {
      new: true,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model("ProductTable", productSchema);
