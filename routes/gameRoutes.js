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

module.exports = router;
