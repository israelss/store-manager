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

const updateById = async (req, res) => {
  const { id } = req.params;
  const productsArray = req.body;
  const [{ productId, quantity }] = productsArray;
  const wasUpdated = await salesServices.updateById({ id, productId, quantity });
  if (!wasUpdated) return res.status(clientError.NOT_FOUND).json({ message: 'Product not found' });
  return res.status(success.OK).json({ saleId: id, itemUpdated: productsArray });
};

module.exports = {
  getAll,
  getById,
  insert,
  updateById,
};
