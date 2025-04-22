// O arquivo user.js define o modelo da tabela de usuários usando Sequelize. Ele especifica que cada usuário terá um nome e um e-mail, ambos obrigatórios. O modelo é baseado na configuração do banco feita anteriormente e será usado pelos controladores para acessar ou modificar dados de usuários.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Cria um modelo chamado User, que o Sequelize usará para criar/interagir com a tabela no banco de dados.
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING, //tipo texto (string), 
    allowNull: false //false é obrigatório
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
