const { clientError } = require('../../helpers/status_codes');
const salesServices = require('../../services/sales');

const checkExistentId = async (req, res, next) => {
  const { id } = req.params;

  const result = await salesServices.getById(id);
  if (!result) return res.status(clientError.NOT_FOUND).json({ message: 'Sale not found' });

  req.sale = result;

  next();
};

module.exports = checkExistentId;
