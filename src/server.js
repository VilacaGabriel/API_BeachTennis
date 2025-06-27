// src/server.js
const app = require('./app');
const { sequelize } = require('./models');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Banco sincronizado');
        app.listen(3000, '0.0.0.0', () => {
            console.log('API rodando em http://localhost:3000');
        });
    })
    .catch(err => console.error('Erro ao sincronizar banco:', err));
