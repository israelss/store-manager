const { clientError } = require('../../helpers/status_codes');
const productsServices = require('../../services/products');

const checkInventory = async (req, res, next) => {
  const saleArray = req.body;

  const check = await Promise.all(saleArray
    .map(async ({ productId, quantity }) => {
      const { quantity: inventoryQuantity } = await productsServices.getById(productId);
      return quantity > inventoryQuantity;
    }));

  const error = check.find((result) => result);

  if (error) {
    return res
      .status(clientError.UNPROCESSABLE_ENTITY)
      .json({ message: 'Such amount is not permitted to sell' });
  }

  next();
};

module.exports = checkInventory;
