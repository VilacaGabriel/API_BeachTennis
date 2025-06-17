const express = require('express');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');

// Middleware para aceitar JSON
app.use(express.json());
app.use('/', userRoutes);
app.use('/player', playerRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
});
