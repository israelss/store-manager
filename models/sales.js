const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT
      s.id as saleId,
      s.date,
      sp.product_id as productId,
      sp.quantity
    FROM StoreManager.sales s
    JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
    ORDER BY s.id, sp.product_id`,
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id as productId,
      sp.quantity
    FROM StoreManager.sales s
    JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
    WHERE s.id = ?
    ORDER BY sp.product_id`,
    [id],
  );
  return result;
};

const insert = async (productsArray) => {
  const [{ insertId: saleId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  const arrayToInsert = productsArray
    .map(({ productId, quantity }) => [saleId, productId, quantity]);

  await connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?',
    [arrayToInsert],
  );
  return { id: saleId, itemsSold: productsArray };
};

module.exports = {
  getAll,
  getById,
  insert,
};
