// Mongoose-Queries
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    adminId: mongoose.Types.ObjectId,

    userCart: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          // ref creates a relationship with ProductTable
          ref: "ProductTable",
          required: true,
        },

        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  // This section enforces collection name to be "UserTable"
  // instead of the default "usertables"
  { collection: "UserTable" }
);

// statics keyword creates a static function
userSchema.statics.createUsers = async function (newUsers) {
  try {
    await this.insertMany(newUsers);
  } catch (err) {
    console.error(err);
  }
};

// statics keyword creates a static function
userSchema.statics.getUsers = async function () {
  try {
    // this refers to UserTable
    const allUsers = await this.find();
    return allUsers;
  } catch (err) {
    console.error(err);
  }
};

// statics keyword creates a static function
userSchema.statics.getSingleUser = async function (userId) {
  try {
    // this refers to UserTable
    const foundUser = await this.findById(userId);
    return foundUser;
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model("UserTable", userSchema);
