const express = require('express');
const router = express.Router();
const playerController = require("../controllers/playerController");
const autenticarToken = require('../middleware/autenticarToken'); // importa o autenticação

// ROTAS PÚBLICAS
router.get('/', playerController.getAll);


// ROTA PROTEGIDA
router.post('/', autenticarToken, playerController.create);
router.get('/:id', autenticarToken,playerController.getById);
router.put('/:id', autenticarToken,playerController.update);
router.delete('/:id', autenticarToken,playerController.delete);
router.get('/category/:category', autenticarToken,playerController.getCategory);
router.get('/search', autenticarToken,playerController.searchPlayers);

module.exports = router;