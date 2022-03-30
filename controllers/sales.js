const salesServices = require('../services/sales');

const getAll = async (_req, res) => {
  const result = await salesServices.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.getById(id);
  if (!result) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};
