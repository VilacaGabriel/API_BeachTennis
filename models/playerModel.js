const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Player =  sequelize.define("Player",{
        id:{
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true},
        name:{
            type:DataTypes.STRING, 
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        gender:{
            type:DataTypes.ENUM("masculino", "feminino", "outro"),
            allowNull:false
        },
        numberPhone:{type:DataTypes.STRING,
            allowNull:true
        },
        superCategory:{
            type:DataTypes.ENUM("A","B","C","D","E","F"),
            allowNull:false
        },
        federationCategory:{
            type: DataTypes.ENUM("A","B","C","D","E","F"),
            allowNull:false
        },
        club:{
            type:DataTypes.STRING,
            allowNull:true
        },
    });

module.exports = Player;