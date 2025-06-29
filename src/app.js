// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rota pública de login (exemplo simples)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === 'admin@teste.com' && senha === '123456') {
    const usuario = { email };
    const token = jwt.sign(usuario, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ erro: 'Credenciais inválidas' });
});

// Rotas protegidas
app.use('/user', userRoutes);
app.use('/players', playerRoutes);
app.use('/games', gameRoutes);

// Swagger (📄 Documentação)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
