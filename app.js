const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');

const app = express();

// Middleware base
app.use(cors());
app.use(express.json());

// Rota pública para login (gera o token JWT)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Simulação simples — substitua pela sua verificação real
  if (email === 'admin@teste.com' && senha === '123456') {
    const usuario = { email };
    const token = jwt.sign(usuario, 'seuSegredoAqui', { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ erro: 'Credenciais inválidas' });
});

// Rotas públicas e privadas
app.use('/user', userRoutes);
app.use('/player', playerRoutes);

// Inicializa servidor e sincroniza banco
sequelize.sync().then(() => {
  app.listen(3000, '0.0.0.0', () => console.log('API rodando em http://localhost:3000'));
});
