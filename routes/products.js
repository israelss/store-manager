const express = require('express');
const productsController = require('../controllers/products');
const productsValidators = require('../middlewares/products');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

router.post(
  '/',
  productsValidators.nameValidation,
  productsValidators.alreadyExists,
  productsValidators.quantityValidation,
  productsController.insert,
);

router.put(
  '/:id',
  productsValidators.nameValidation,
  productsValidators.quantityValidation,
  productsController.updateById,
  );

module.exports = router;
