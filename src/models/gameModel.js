const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Game = sequelize.define("Game", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nameGame:{
        type: DataTypes.STRING,
        allowNull:false
    },
    gameCategory:{
        type:DataTypes.ENUM("A","B","C","D","E","F"),
        allowNull:false
    },
    statusGame:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: 'Em andamento',
    }
});

module.exports = Game;