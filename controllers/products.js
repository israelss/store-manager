const productsServices = require('../services/products');

const getAll = async (_req, res) => {
  const result = await productsServices.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.getById(id);
  if (!result) res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};
