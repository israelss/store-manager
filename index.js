require('dotenv').config();
const express = require('express');
const productsRoutes = require('./routes/products');
const salesRoutes = require('./routes/sales');

const app = express();
app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
