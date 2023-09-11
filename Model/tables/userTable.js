// MongoDB-Queries

const dbConnection = require("../dbConnection");
const { ObjectId } = require("mongodb");

class UserTable {
  constructor(userName, userEmail, adminId, userCart) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.adminId = adminId;
    this.userCart = userCart;
  }

  async createUsers(usersArray) {
    let result;

    try {
      const db = dbConnection.getDatabase();
      result = await db.collection("UserTable").insertMany(usersArray);
    } catch {
      (err) => console.error(err);
    }

    return result;
  }

  static async getUsers() {
    let foundUsers;

    try {
      const db = dbConnection.getDatabase();
      const cursor = await db.collection("UserTable").find();
      foundUsers = await cursor.toArray();
    } catch (err) {
      console.error("Error fetching users:", err);
      throw err;
    } finally {
      // If we close database it does not fetch anything.
      // dbConnection.closeDatabase();
    }

    return foundUsers;
  }

  static async findById(userId) {
    let foundUser;

    try {
      const db = dbConnection.getDatabase();
      foundUser = await db
        .collection("UserTable")
        .findOne({ _id: new ObjectId(userId) });
    } catch (err) {
      console.error(err);
      throw err;
    }

    return foundUser;
  }

  static async updateCart(currentUser, alreadyAddedProductIndex, addedProduct) {
    const db = dbConnection.getDatabase();
    const userCollection = await db.collection("UserTable");
    let quantity = 1;

    const isProductAlreadyAdded =
      alreadyAddedProductIndex === -1 ? false : true;

    // {
    //   _id: new ObjectId("64e52e5ba9f5d11228df6a1a"),
    //   userName: 'Aras',
    //   userEmail: 'aras@gmail.com',
    //   adminId: 'ea764199-dcb7-43bb-8e64-7afb783df70c',
    //   userCart: [
    //     { _id: new ObjectId("64f8e789338dc73937e88751"), qty: 6 },
    //     { _id: new ObjectId("64f8eef47af9ade5a236939f"), qty: 6 }
    //   ]
    // }

    // updates the quantity of an existing userCart.

    if (isProductAlreadyAdded) {
      quantity = currentUser.userCart[alreadyAddedProductIndex].qty + 1;

      try {
        await userCollection.updateOne(
          { _id: currentUser._id },
          { $set: { [`userCart.${alreadyAddedProductIndex}.qty`]: quantity } }
        );
      } catch (err) {
        console.error(err);
      }

      return;
    }

    // {
    //   _id: new ObjectId("64e52e5ba9f5d11228df6a1a"),
    //   userName: 'Aras',
    //   userEmail: 'aras@gmail.com',
    //   adminId: 'ea764199-dcb7-43bb-8e64-7afb783df70c',
    //   userCart: [
    //     { _id: new ObjectId("64f8e789338dc73937e88751"), qty: 6 },
    //     { _id: new ObjectId("64f8eef47af9ade5a236939f"), qty: 6 }
    //   ]
    // }

    // adds a new line to userCart

    try {
      await userCollection.updateOne(
        { _id: currentUser._id },
        { $push: { userCart: { _id: addedProduct._id, qty: quantity } } }
      );
    } catch (err) {
      console.error(err);
    }
  }

  static async removeCartItem(userId, productId) {
    try {
      const db = dbConnection.getDatabase();
      const userCollection = await db.collection("UserTable");
      userCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { userCart: { _id: new ObjectId(productId) } } }
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // {
  //   _id: new ObjectId("64e52e5ba9f5d11228df6a1a"),
  //   userName: 'Aras',
  //   userEmail: 'aras@gmail.com',
  //   adminId: 'ea764199-dcb7-43bb-8e64-7afb783df70c',
  //   userCart: [
  //     { _id: new ObjectId("64f8e789338dc73937e88751"), qty: 6 },
  //     { _id: new ObjectId("64f8eef47af9ade5a236939f"), qty: 6 }
  //   ]
  // }

  // removes the entire userCart

  static async removeAllCart(userId) {
    try {
      const db = dbConnection.getDatabase();
      const userCollection = await db.collection("UserTable");
      await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { userCart: [] } }
      );
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = UserTable;
