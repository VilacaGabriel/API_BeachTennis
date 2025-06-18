const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const autenticarToken = require('../middleware/autenticarToken');

router.get('/', autenticarToken, gameController.getAll);
router.get('/:id', autenticarToken, gameController.getById);
router.post('/', autenticarToken, gameController.create);
router.put('/:id', autenticarToken, gameController.update);
router.delete('/:id', autenticarToken, gameController.remove);
router.get('/:id/players', autenticarToken, gameController.getPlayersByGameId);

// Rota que faltava para atualizar as pontuações dos jogadores no jogo:
router.put('/:id/players/stats', autenticarToken, gameController.updatePlayerStats);

module.exports = router;
