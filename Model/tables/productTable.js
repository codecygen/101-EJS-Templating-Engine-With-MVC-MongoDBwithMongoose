// Mongoose-Queries
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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

    adminId: mongoose.Types.ObjectId,
}, { collection: "ProductTable" });

module.exports = mongoose.model("ProductTable", productSchema);

// const dbConnection = require("../dbConnection");
// const { ObjectId } = require("mongodb");

// class ProductTable {
//   constructor(
//     _id,
//     productName,
//     productDesc,
//     productPrice,
//     productImg,
//     adminId
//   ) {
//     this._id = _id;
//     this.productName = productName;
//     this.productDesc = productDesc;
//     this.productPrice = +productPrice;
//     this.productImg = productImg;
//     this.adminId = adminId;
//   }

//   async save() {
//     const db = dbConnection.getDatabase();
//     const collection = await db.collection("ProductTable");

//     const { _id, ...documentWithoutId } = this;

//     if (!this._id) {
//       try {
//         const result = await collection.insertOne(documentWithoutId);
//       } catch (err) {
//         console.error(err);
//       }

//       return;
//     }

//     // If saving product is in edit mode.
//     try {
//       const result = await collection.updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: documentWithoutId }
//       );
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   }

//   static async getProducts() {
//     let foundProducts;

//     try {
//       const db = dbConnection.getDatabase();
//       const cursor = await db.collection("ProductTable").find();
//       foundProducts = await cursor.toArray();
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       throw err;
//     } finally {
//       // If we close database it does not fetch anything.
//       // dbConnection.closeDatabase();
//     }

//     return foundProducts;
//   }

//   static async findById(productId) {
//     let foundProduct;
//     try {
//       const db = dbConnection.getDatabase();
//       foundProduct = await db
//         .collection("ProductTable")
//         .findOne({ _id: new ObjectId(productId) });
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }

//     return foundProduct;
//   }

//   static async adminProducts(adminId) {
//     let adminProducts = [];
//     try {
//       const db = dbConnection.getDatabase();
//       const cursor = await db
//         .collection("ProductTable")
//         .find({ adminId: adminId });
//       adminProducts = await cursor.toArray();
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }

//     return adminProducts;
//   }

//   static async destroy(productId) {
//     try {
//       const db = dbConnection.getDatabase();
//       await db
//         .collection("ProductTable")
//         .deleteOne({ _id: new ObjectId(productId) });
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   }
// }

// module.exports = ProductTable;
