const express = require('express');
const salesController = require('../controllers/sales');
const salesValidators = require('../middlewares/sales');

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);

router.post(
  '/',
  salesValidators.productIdValidation,
  salesValidators.quantityValidation,
   salesController.insert,
);

module.exports = router;
