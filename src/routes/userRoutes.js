const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Registro de novo usuário
router.post('/register', userController.create);

// Login
router.post('/login', userController.login);

// (Opcional) Listar todos usuários - protegida com autenticação (exemplo)
// const autenticarToken = require('../middleware/autenticarToken');
// router.get('/', autenticarToken, userController.getAllUsers);

module.exports = router;
