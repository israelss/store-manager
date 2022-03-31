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

const insert = async (req, res) => {
  const insertedSale = await salesServices.insert(req.body);
  return res.status(success.CREATED).json(insertedSale);
};

module.exports = {
  getAll,
  getById,
  insert,
};
