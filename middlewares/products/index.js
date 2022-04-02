const alreadyExists = require('./alreadyExists');
const checkExistentId = require('./checkExistentId');
const checkInventory = require('./checkInventory');
const nameValidation = require('./nameValidation');
const quantityValidation = require('./quantityValidation');
const updateQuantity = require('./updateQuantity');

module.exports = {
  alreadyExists,
  checkExistentId,
  checkInventory,
  nameValidation,
  quantityValidation,
  updateQuantity,
};
