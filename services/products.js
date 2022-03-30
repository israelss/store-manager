const productsModels = require('../models/products');

const getAll = async () => {
  const result = await productsModels.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModels.getById(id);
  return result;
};

const getByName = async (name) => {
  const result = await productsModels.getByName(name);
  return result;
};

module.exports = {
  getAll,
  getById,
  getByName,
};
