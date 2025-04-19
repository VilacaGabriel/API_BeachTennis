const express = require('express');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
});
