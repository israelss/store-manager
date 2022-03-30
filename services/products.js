const productsModels = require('../models/products');

const getAll = async () => {
  const result = await productsModels.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModels.getById(id);
  return result;
};

module.exports = {
  getAll,
  getById,
};
