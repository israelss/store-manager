const express = require('express');
const salesController = require('../controllers/sales');
const salesValidators = require('../middlewares/sales');
const productsValidators = require('../middlewares/products');

const router = express.Router();

router.route('/')
  .get(salesController.getAll)
  .post(
    salesValidators.productIdValidation,
    salesValidators.quantityValidation,
    productsValidators.checkInventory,
    salesController.insert,
  );

router.route('/:id')
  .get(salesValidators.checkExistentId, salesController.getById)
  .delete(salesValidators.checkExistentId, salesController.deleteById)
  .put(
    salesValidators.productIdValidation,
    salesValidators.quantityValidation,
    salesValidators.checkExistentId,
    salesController.updateById,
  );

module.exports = router;
