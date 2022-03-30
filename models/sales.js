const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT
      s.id as saleId,
      s.date,
      sp.product_id as productId,
      sp.quantity
    FROM sales s
    JOIN sales_products sp ON sp.sale_id = s.id
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
    FROM sales s
    JOIN sales_products sp ON sp.sale_id = s.id
    WHERE s.id = ?
    ORDER BY sp.product_id`,
    [id],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
};
