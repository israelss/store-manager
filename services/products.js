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

const insert = async (productObject) => {
  const { id } = await productsModels.insert(productObject);
  return { id };
};

const updateById = async (productObject) => {
  const wasUpdated = await productsModels.updateById(productObject);
  return wasUpdated;
};

module.exports = {
  getAll,
  getById,
  getByName,
  insert,
  updateById,
};
