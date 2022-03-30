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

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const wasUpdated = await productsServices.updateById({ id, name, quantity });
  if (!wasUpdated) return res.status(clientError.NOT_FOUND).json({ message: 'Product not found' });
  return res.status(success.OK).json({ id, name, quantity });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const wasDeleted = await productsServices.deleteById(id);
  if (!wasDeleted) return res.status(clientError.NOT_FOUND).json({ message: 'Product not found' });
  return res.status(success.NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  insert,
  updateById,
  deleteById,
};
