const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return result;
};

const getByName = async (name) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );
  return result;
};

const insert = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES ( ? , ? )',
    [name, quantity],
  );
  return { id: insertId };
};

module.exports = {
  getAll,
  getById,
  getByName,
  insert,
};
