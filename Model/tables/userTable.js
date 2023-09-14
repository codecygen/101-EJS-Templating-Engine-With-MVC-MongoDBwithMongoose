// Mongoose-Queries
const mongoose = require("mongoose");

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
        _id: String,
        qty: Number,
      },
    ],
  },
  // This section enforces collection name to be "UserTable"
  // instead of the default "usertables"
  { collection: "UserTable" }
);

module.exports = mongoose.model("UserTable", userSchema);
