const productsServices = require('../../services/products');
const salesServices = require('../../services/sales');

const postUpdate = async (saleArray) => {
  await Promise.all(saleArray
    .map(async ({ productId, quantity }) => {
      const product = await productsServices.getById(productId);
      const newQuantity = product.quantity - quantity;
      const updatedProduct = { ...product, quantity: newQuantity };
      await productsServices.updateById(updatedProduct);
      return updatedProduct;
    }));
};

const putUpdate = async (id, saleArray) => {
  const saleData = await salesServices.getById(id);
  await Promise.all(saleData.map(async ({ productId, quantity }, index) => {
    const product = await productsServices.getById(productId);
    const newQuantity = product.quantity + (quantity - saleArray[index].quantity);
    const updatedProduct = { ...product, quantity: newQuantity };
    await productsServices.updateById(updatedProduct);
    return updatedProduct;
  }));
};

const deleteUpdate = async (id) => {
  const saleData = await salesServices.getById(id);
  await Promise.all(saleData.map(async ({ productId, quantity }) => {
    const product = await productsServices.getById(productId);
    const newQuantity = product.quantity + quantity;
    const updatedProduct = { ...product, quantity: newQuantity };
    await productsServices.updateById(updatedProduct);
    return updatedProduct;
  }));
};

const updateQuantity = async (req, _res, next) => {
  const { method, body: saleArray, params: { id } } = req;
  switch (method) {
    case 'PUT':
      await putUpdate(id, saleArray);
      break;
      case 'POST':
        await postUpdate(saleArray);
        break;
        case 'DELETE':
      await deleteUpdate(id);
      break;
    default:
      break;
  }

  next();
};

module.exports = updateQuantity;
