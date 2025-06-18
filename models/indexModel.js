const sequelize = require("../config/database");
const Player = require("./playerModel");
const Game = require("./gameModel");
const PlayerGame = require("./playerGame");

// Definindo as associações many-to-many com PlayerGame como tabela intermediária
Player.belongsToMany(Game, { through: PlayerGame, foreignKey: "playerId", otherKey: "gameId" });
Game.belongsToMany(Player, { through: PlayerGame, foreignKey: "gameId", otherKey: "playerId" });

module.exports = { sequelize, Player, Game, PlayerGame };
