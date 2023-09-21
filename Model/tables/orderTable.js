// Mongoose-Queries
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    orders: [
      [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "ProductTable",
          },

          qty: {
            type: Number,
            required: true,
          },
        },
      ],
    ],
  },
  { collection: "OrderTable" }
);

orderSchema.statics.saveOrder = async function (orderList, userId) {

  try {
    await this.updateOne(
      { userId: userId },
      {
        $push: {
          orders: {
            $each: [orderList],
          },
        },
      },
      { upsert: true } // This creates a new document if one doesn't exist for the specified userId
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model("OrderTable", orderSchema);

// const dbConnection = require("../dbConnection");
// const { ObjectId } = require("mongodb");

// const UserTable = require("./userTable");

// class OrderTable {
//   constructor(orderList, userId) {
//     this.orderList = orderList;
//     this.userId = userId;
//   }

//   async save() {
//     const db = dbConnection.getDatabase();
//     const orderCollection = await db.collection("OrderTable");

//     try {
//       await orderCollection.updateOne(
//         { userId: this.userId },
//         {
//           $push: {
//             orders: {
//               $each: [this.orderList],
//             },
//           },
//         },
//         { upsert: true } // This creates a new document if one doesn't exist for the specified userId
//       );
//     } catch (err) {
//       console.error(err);
//     }

//     await UserTable.removeAllCart(this.userId);
//   }

//   static async getOrderList(userId) {

//     let foundOrders;

//     try {
//       const db = dbConnection.getDatabase();
//       foundOrders = await db
//         .collection("OrderTable")
//         .findOne({ userId: new ObjectId(userId) });
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }

//     if(!foundOrders) {
//       foundOrders = {};
//       foundOrders.orders = [];
//     }

//     const productIdsAndQty = foundOrders.orders;

//     return productIdsAndQty;
//   }
// }

// module.exports = OrderTable;
