const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

  const token = authHeader.split(' ')[1]; // Pega a segunda parte após "Bearer"

  if (!token) return res.status(401).json({ erro: 'Token inválido' });

  jwt.verify(token, 'seuSegredoAqui', (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido' });

    req.usuario = usuario; // salva dados do usuário na requisição
    next();
  });
}

module.exports = autenticarToken;
