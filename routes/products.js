const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

module.exports = router;
