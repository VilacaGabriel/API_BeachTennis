const express = require('express');
const router = express.Router();
const playerController = require("../controllers/playerController");

router.post('/', playerController.create);
router.get('/', playerController.getAll);
router.get('/:id', playerController.getById);
router.put('/:id', playerController.update);
router.delete('/:id', playerController.delete);
router.get('/category/:category', playerController.getCategory);
router.get('/search', playerController.searchPlayers);

module.exports = router;