const Tables = require("../dbAssociation");
const { v4: uuidv4 } = require("uuid");

const checkAndCreateAdminsAndUsers = async () => {
  const allUsers = await Tables.UserTable.getUsers();

  if (allUsers.length > 0) {
    return;
  }

  const newUsers = [
    {
      userName: "Aras",
      userEmail: "aras@gmail.com",
      adminId: uuidv4(),
    },
    {
      userName: "Jason",
      userEmail: "jason@gmail.com",
      adminId: uuidv4(),
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

  const userTable = new Tables.UserTable();

  await userTable.createUsers(newUsers);
};

// const getAllAdmins = async () => {
//   let result;

//   try {
//     result = await Tables.UserTable.findAll({ where: { adminId: true } });
//   } catch (err) {
//     console.error(err);
//   }

//   const allAdmins = result.map((value) => value.toJSON());
//   return allAdmins;
// };

const getAllUsers = async () => {
  const allUsers = await Tables.UserTable.getUsers();

  return allUsers;
};

const getOneUser = async (userId) => {
  const foundUser = await Tables.UserTable.findById(userId);
  return foundUser;
};

const getAdminProducts = async (adminId) => {
  const adminProducts = await Tables.ProductTable.adminProducts(adminId);
  return adminProducts;
};

module.exports = {
  // checkAndCreateAdminsAndUsers,
  // getAllAdmins,
  // getAllUsers,
  // getOneUser,
  // getAdminProducts,
};
