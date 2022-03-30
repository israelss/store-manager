const { clientError } = require('../../helpers/status_codes');
const productsServices = require('../../services/products');

const alreadyExists = async (req, res, next) => {
  const { name } = req.body;

  const product = await productsServices.getByName(name);

  if (product) {
    return res.status(clientError.CONFLICT).json({ message: 'Product already exists' });
  }

  next();
};

module.exports = alreadyExists;
