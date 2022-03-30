const { success, clientError } = require('../helpers/status_codes');
const salesServices = require('../services/sales');

const getAll = async (_req, res) => {
  const result = await salesServices.getAll();
  return res.status(success.OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.getById(id);
  if (!result) return res.status(clientError.NOT_FOUND).json({ message: 'Sale not found' });
  return res.status(success.OK).json(result);
};

module.exports = {
  getAll,
  getById,
};
