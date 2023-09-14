const mongoose = require("mongoose");

const Tables = require("../dbAssociation");

const checkAndCreateAdminsAndUsers = async () => {
  const allUsers = await getAllUsers();

  if (allUsers.length > 0) {
    return;
  }

  const newUsers = [
    {
      userName: "Aras",
      userEmail: "aras@gmail.com",
      adminId: new mongoose.Types.ObjectId(),
    },
    {
      userName: "Jason",
      userEmail: "jason@gmail.com",
      adminId: new mongoose.Types.ObjectId(),
    },
    {
      userName: "Alice",
      userEmail: "alice@gmail.com",
    },
    {
      userName: "Amanda",
      userEmail: "amanda@gmail.com",
    },
  ];

  try {
    await Tables.UserTable.insertMany(newUsers);
  } catch (err) {
    console.error(err);
  }
};

const getAllUsers = async () => {
  let allUsers;

  try {
    allUsers = await Tables.UserTable.find();
  } catch (err) {
    console.error(err);
  }

  return allUsers;
};

const getOneUser = async (userId) => {
  let foundUser;

  try {
    foundUser = await Tables.UserTable.findById(userId);
  } catch (err) {
    console.error(err);
  }
  
  return foundUser;
};

// const getAdminProducts = async (adminId) => {
//   const adminProducts = await Tables.ProductTable.adminProducts(adminId);
//   return adminProducts;
// };

module.exports = {
  checkAndCreateAdminsAndUsers,
  getAllUsers,
  getOneUser,
  // getAdminProducts,
};
