// O arquivo database.js configura a conexão com o banco de dados usando o Sequelize. Aqui escolhemos o SQLite como banco local, ideal para projetos pequenos ou protótipos. A conexão é exportada e usada pelos modelos da aplicação para interagir com o banco de dados.

const { Sequelize } = require('sequelize'); //improta a biblioteca 

//configura a comunicação do banco de dados neste caso SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});
// Exporta a instância do Sequelize para que ela possa ser usada em outras partes do projeto
module.exports = sequelize;
