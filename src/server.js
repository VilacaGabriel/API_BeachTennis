// src/server.js
const app = require('./app');
const { sequelize } = require('./models');

sequelize.sync({ alter: true }) // ou { force: true } para recriar tabelas
  .then(() => {
    console.log('✅ Banco sincronizado');
    app.listen(3000, '0.0.0.0', () => {
      console.log('🚀 API rodando em http://localhost:3000');
      console.log('📚 Documentação Swagger em http://localhost:3000/api-docs');
    });
  })
  .catch(err => console.error('❌ Erro ao sincronizar banco:', err));
