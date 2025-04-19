const { Sequelize } = require('sequelize'); //improta a biblioteca 

//configura a comunicação do banco de dados neste caso SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

module.exports = sequelize;
