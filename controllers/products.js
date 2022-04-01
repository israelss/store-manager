const { success } = require('../helpers/status_codes');
const productsServices = require('../services/products');

const getAll = async (_req, res) => {
  const result = await productsServices.getAll();
  return res.status(success.OK).json(result);
};

const getById = async (req, res) => {
  const { product } = req;
  return res.status(success.OK).json(product);
};

const insert = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = await productsServices.insert({ name, quantity });
  return res.status(success.CREATED).json({ id, name, quantity });
};

const updateById = async (req, res) => {
  const { id } = req.product;
  const { name, quantity } = req.body;
  await productsServices.updateById({ id, name, quantity });
  return res.status(success.OK).json({ id, name, quantity });
};

const deleteById = async (req, res) => {
  const { id } = req.product;
  await productsServices.deleteById(id);
  return res.status(success.NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  insert,
  updateById,
  deleteById,
};
