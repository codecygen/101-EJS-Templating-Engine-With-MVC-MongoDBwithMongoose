// MongoDB-Sequelize-Manage-Database-Function-Operations
const Tables = require("../dbAssociation");

const addNewProduct = async (newProduct) => {
  const { productName, productDesc, productPrice, productImg, adminId } =
    newProduct;

  const productTable = new Tables.ProductTable({
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
};

const getAllProducts = async () => {
  let allProducts;

  try {
    allProducts = await Tables.ProductTable.find();
  } catch (err) {
    console.error(err);
  }

  return allProducts;
};

const getOneProduct = async (productId) => {
  let foundProduct;

  try {
    foundProduct = await Tables.ProductTable.findById(productId);
  } catch (err) {
    console.error(err);
  }

  return foundProduct;
};

const updateOneProduct = async (updatedData) => {
  const { _id, productName, productDesc, productPrice, productImg, adminId } =
    updatedData;

  try {
    await Tables.ProductTable.findOneAndUpdate({ _id: _id }, updatedData, {
      new: true,
    });
  } catch (err) {
    console.error(err);
  }
};

// const deleteOneProduct = async (productId) => {
//   const result = await Tables.ProductTable.destroy(productId);
// };

module.exports = {
  addNewProduct,
  getAllProducts,
  getOneProduct,
  updateOneProduct,
  // deleteOneProduct,
};
