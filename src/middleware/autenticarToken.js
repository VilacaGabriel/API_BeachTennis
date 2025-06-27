const jwt = require('jsonwebtoken');
require('dotenv').config(); // garante que variáveis do .env estão disponíveis

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ erro: 'Token inválido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido' });

    req.usuario = usuario;
    next();
  });
}

module.exports = autenticarToken;
