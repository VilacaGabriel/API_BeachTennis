const express = require('express');
const router = express.Router();
const playerController = require("../controllers/playerController");
const autenticarToken = require('../middleware/autenticarToken');

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Gerenciamento de jogadores
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Lista todos os jogadores (pública)
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Lista de jogadores retornada com sucesso
 */
router.get('/', playerController.getAll);

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Cria um novo jogador
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - namePlayer
 *             properties:
 *               namePlayer:
 *                 type: string
 *               lastNamePlayer:
 *                 type: string
 *               gender:
 *                 type: string
 *               numberPhone:
 *                 type: string
 *               superCategory:
 *                 type: string
 *               federationCategory:
 *                 type: string
 *               club:
 *                 type: string
 *               scoreTotal:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 */
router.post('/', autenticarToken, playerController.create);

/**
 * @swagger
 * /players/category/{category}:
 *   get:
 *     summary: Busca jogadores por super categoria
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de jogadores da categoria
 */
router.get('/category/:category', autenticarToken, playerController.getCategory);

/**
 * @swagger
 * /players/search:
 *   get:
 *     summary: Busca jogadores com filtros via query string
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: namePlayer
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: club
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: superCategory
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de jogadores encontrada
 */
router.get('/search', autenticarToken, playerController.searchPlayers);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Busca jogador por ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogador encontrado
 *       404:
 *         description: Jogador não encontrado
 */
router.get('/:id', autenticarToken, playerController.getById);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Atualiza jogador por ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               club: "MadeiraMadeira"
 *     responses:
 *       200:
 *         description: Jogador atualizado
 *       404:
 *         description: Jogador não encontrado
 */
router.put('/:id', autenticarToken, playerController.update);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Deleta jogador por ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Jogador deletado com sucesso
 *       404:
 *         description: Jogador não encontrado
 */
router.delete('/:id', autenticarToken, playerController.delete);

module.exports = router;
