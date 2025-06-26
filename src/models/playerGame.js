const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PlayerGame = sequelize.define("PlayerGame", {
    playerId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Players",
            key: "id"
        },
        allowNull: false
    },
    gameId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Games",
            key: "id"
        },
        allowNull: false
    },
    gamesPro: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    saldoGames: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    vitorias: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    derrotas: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: "player_games",
    timestamps: false
});

module.exports = PlayerGame;
