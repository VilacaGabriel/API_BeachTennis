const Game = require('../models/gameModel');

const getAllGames = async () => {
  return await Game.findAll();
};

const getGameById = async (id) => {
  return await Game.findByPk(id);
};

const createGame = async (data) => {
  return await Game.create(data);
};

const updateGame = async (id, data) => {
  const game = await Game.findByPk(id);
  if (!game) return null;
  return await game.update(data);
};

const deleteGame = async (id) => {
  const game = await Game.findByPk(id);
  if (!game) return null;
  await game.destroy();
  return true;
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};
