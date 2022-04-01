const salesModels = require('../models/sales');

const getAll = async () => {
  const result = await salesModels.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModels.getById(id);
  return result.length > 0 ? result : null;
};

const insert = async (productArray) => {
  const insertedSale = await salesModels.insert(productArray);
  return insertedSale;
};

const updateById = async (productObject) => {
  const wasUpdated = await salesModels.updateById(productObject);
  return wasUpdated;
};

const deleteById = async (id) => {
  const wasDeleted = await salesModels.deleteById(id);
  return wasDeleted;
};

module.exports = {
  deleteById,
  getAll,
  getById,
  insert,
  updateById,
};
