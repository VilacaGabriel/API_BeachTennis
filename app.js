// O app.js é o ponto de entrada da aplicação. Ele carrega o Express, configura o uso de JSON nas requisições, conecta o banco de dados SQLite usando Sequelize, carrega as rotas de usuário e finalmente sobe o servidor na porta 3000. É esse arquivo que garante que todos os componentes da API funcionem em conjunto.

const express = require('express');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());//Esse middleware permite que o Express entenda JSON no corpo das requisições (ex: em POST e PUT).
app.use('/', userRoutes); //Todas as rotas definidas no userRoutes são carregadas a partir do caminho raiz /.

sequelize.sync().then(() => { //Aqui o Sequelize sincroniza os modelos com o banco de dados (ou seja, cria as tabelas se não existirem).
  // A aplicação começa a ouvir na porta 3000.
  // Exibe uma mensagem de sucesso no console.
  app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
});
