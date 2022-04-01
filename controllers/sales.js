const { success } = require('../helpers/status_codes');
const salesServices = require('../services/sales');

const getAll = async (_req, res) => {
  const result = await salesServices.getAll();
  return res.status(success.OK).json(result);
};

const getById = async (req, res) => {
  const { sale } = req;
  return res.status(success.OK).json(sale);
};

const insert = async (req, res) => {
  const insertedSale = await salesServices.insert(req.body);
  return res.status(success.CREATED).json(insertedSale);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const productsArray = req.body;
  const [{ productId, quantity }] = productsArray;
  await salesServices.updateById({ id, productId, quantity });
  return res.status(success.OK).json({ saleId: id, itemUpdated: productsArray });
};

module.exports = {
  getAll,
  getById,
  insert,
  updateById,
};
