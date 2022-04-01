const express = require('express');
const productsController = require('../controllers/products');
const productsValidators = require('../middlewares/products');

const router = express.Router();

router.route('/')
  .get(productsController.getAll)
  .post(
    productsValidators.nameValidation,
    productsValidators.quantityValidation,
    productsValidators.alreadyExists,
    productsController.insert,
  );

router.route('/:id')
  .get(productsValidators.checkExistentId, productsController.getById)
  .delete(productsValidators.checkExistentId, productsController.deleteById)
  .put(
    productsValidators.nameValidation,
    productsValidators.quantityValidation,
    productsValidators.checkExistentId,
    productsController.updateById,
  );

module.exports = router;
