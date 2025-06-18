const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');
const { sequelize } = require('./models/indexModel');
const gameRoutes = require('./routes/gameRoutes');

sequelize.sync({ alter: true })  // ou .sync({ force: true }) para resetar tabelas (use com cuidado)
  .then(() => console.log("Banco sincronizado"))
  .catch(err => console.error("Erro ao sincronizar banco:", err));

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
app.use('/games', gameRoutes);

// Inicializa servidor e sincroniza banco
sequelize.sync().then(() => {
  app.listen(3000, '0.0.0.0', () => console.log('API rodando em http://localhost:3000'));
});
