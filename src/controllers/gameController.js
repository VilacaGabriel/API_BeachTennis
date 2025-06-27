const { Game, Player } = require('../models');
const gameRepo = require('../repositories/gameRepository');
const PlayerGame = require('../models/playerGame');

// Listar todos os jogos
const getAll = async (req, res) => {
  try {
    const games = await gameRepo.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
};

// Buscar jogo por ID (com jogadores e atributos da tabela intermediária)
const getById = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id, {
      include: {
        model: Player,
        through: { attributes: ['gamesPro', 'saldoGames', 'vitorias', 'derrotas'] }
      }
    });
    if (!game) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogo' });
  }
};

// Criar novo jogo e associar jogadores (se fornecido)
const create = async (req, res) => {
  try {
    const { nameGame, gameCategory, statusGame, players } = req.body;

    const novoJogo = await gameRepo.createGame({ nameGame, gameCategory, statusGame });

    if (Array.isArray(players) && players.length > 0) {
      await novoJogo.setPlayers(players);
    }

    const created = await Game.findByPk(novoJogo.id, {
      include: {
        model: Player,
        through: { attributes: ['gamesPro', 'saldoGames', 'vitorias', 'derrotas'] }
      }
    });

    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar jogo' });
  }
};

// Atualizar jogo e suas associações de jogadores
const update = async (req, res) => {
  const gameId = req.params.id;
  const { players, ...gameData } = req.body;

  try {
    const game = await Game.findByPk(gameId);
    if (!game) return res.status(404).json({ error: 'Jogo não encontrado' });

    await game.update(gameData);

    if (Array.isArray(players)) {
      await game.setPlayers(players);
    }

    const updated = await Game.findByPk(gameId, {
      include: {
        model: Player,
        through: { attributes: ['gamesPro', 'saldoGames', 'vitorias', 'derrotas'] }
      }
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar jogo' });
  }
};

// Deletar jogo
const remove = async (req, res) => {
  try {
    const sucesso = await gameRepo.deleteGame(req.params.id);
    if (!sucesso) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar jogo' });
  }
};

// Buscar jogadores associados a um jogo (com atributos da tabela intermediária)
const getPlayersByGameId = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findByPk(gameId, {
      include: {
        model: Player,
        through: { attributes: ['gamesPro', 'saldoGames', 'vitorias', 'derrotas'] }
      }
    });

    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json(game.Players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar jogadores do jogo' });
  }
};

// Atualizar estatísticas dos jogadores no jogo (tabela intermediária)
const updatePlayerStats = async (req, res) => {
  const gameId = req.params.id;
  const stats = req.body;

  try {
    for (const playerId in stats) {
      const stat = stats[playerId];

      const [updated] = await PlayerGame.update(
        {
          vitorias: stat.vitorias,
          derrotas: stat.derrotas,
          saldoGames: stat.saldo,
          gamesPro: stat.gamespro
        },
        {
          where: { gameId, playerId }
        }
      );

      if (updated === 0) {
        await PlayerGame.create({
          gameId,
          playerId,
          vitorias: stat.vitorias,
          derrotas: stat.derrotas,
          saldoGames: stat.saldo,
          gamesPro: stat.gamespro
        });
      }
    }

    res.json({ message: 'Estatísticas atualizadas com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar estatísticas dos jogadores' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getPlayersByGameId,
  updatePlayerStats
};
