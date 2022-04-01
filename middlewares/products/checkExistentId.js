const { clientError } = require('../../helpers/status_codes');
const productsServices = require('../../services/products');

const checkExistentId = async (req, res, next) => {
  const { id } = req.params;

  const result = await productsServices.getById(id);
  if (!result) return res.status(clientError.NOT_FOUND).json({ message: 'Product not found' });

  req.product = result;

  next();
};

module.exports = checkExistentId;
