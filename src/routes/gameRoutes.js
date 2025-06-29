const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const autenticarToken = require('../middleware/autenticarToken');

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Gerenciamento de jogos de Beach Tennis
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Lista todos os jogos
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jogos retornada com sucesso
 */
router.get('/', autenticarToken, gameController.getAll);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Busca um jogo por ID
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do jogo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogo encontrado
 *       404:
 *         description: Jogo não encontrado
 */
router.get('/:id', autenticarToken, gameController.getById);

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Cria um novo jogo
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameGame:
 *                 type: string
 *               gameCategory:
 *                 type: string
 *               statusGame:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jogo criado com sucesso
 */
router.post('/', autenticarToken, gameController.create);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Atualiza um jogo
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do jogo
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameGame:
 *                 type: string
 *               gameCategory:
 *                 type: string
 *               statusGame:
 *                 type: string
 *     responses:
 *       200:
 *         description: Jogo atualizado com sucesso
 */
router.put('/:id', autenticarToken, gameController.update);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Remove um jogo
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do jogo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Jogo deletado com sucesso
 */
router.delete('/:id', autenticarToken, gameController.remove);

/**
 * @swagger
 * /games/{id}/players:
 *   get:
 *     summary: Lista os jogadores de um jogo
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do jogo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de jogadores do jogo
 */
router.get('/:id/players', autenticarToken, gameController.getPlayersByGameId);

/**
 * @swagger
 * /games/{id}/players/stats:
 *   put:
 *     summary: Atualiza estatísticas dos jogadores em um jogo
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do jogo
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               jogadores: [
 *                 {
 *                   playerId: 1,
 *                   gamesPro: 3,
 *                   saldoGames: 2,
 *                   vitorias: 2,
 *                   derrotas: 1
 *                 }
 *               ]
 *     responses:
 *       200:
 *         description: Estatísticas atualizadas
 */
router.put('/:id/players/stats', autenticarToken, gameController.updatePlayerStats);

module.exports = router;
