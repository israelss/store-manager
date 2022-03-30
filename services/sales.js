const salesModels = require('../models/sales');

const getAll = async () => {
  const result = await salesModels.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModels.getById(id);
  return result.length > 0 ? result : null;
};

module.exports = {
  getAll,
  getById,
};
