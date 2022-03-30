const { success, clientError } = require('../helpers/status_codes');
const productsServices = require('../services/products');

const getAll = async (_req, res) => {
  const result = await productsServices.getAll();
  return res.status(success.OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.getById(id);
  if (!result) return res.status(clientError.NOT_FOUND).json({ message: 'Product not found' });
  return res.status(success.OK).json(result);
};

const insert = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = await productsServices.insert({ name, quantity });
  return res.status(success.OK).json({ id, name, quantity });
};

module.exports = {
  getAll,
  getById,
  insert,
};
