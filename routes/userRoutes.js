// O arquivo userRoutes.js define as rotas relacionadas aos usuários. Ele usa o express.Router() para organizar os caminhos da API e conecta cada rota com uma função do controlador. Assim, quando um cliente faz uma requisição para /users, a função correspondente é executada. Há rotas para criar, listar, atualizar e deletar usuários.

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // esse caminho precisa estar certo

//Rota POST para criar novos usuarios
router.post('/users', userController.createUser);
// Método POST
// Endpoint: /users
// Chama a função createUser do controlador.

//Rota GET para listar usuarios no banco
router.get('/users', userController.getAllUsers)
// Método GET
// Endpoint: /users
// Retorna todos os usuários usando getAllUsers.

//Rota PUT para alterar um usuario
router.put('/users/:id',userController.updateUser);

//Rota DELETE para deletar um usuario
router.delete('/users/:id',userController.deleteUser);

module.exports = router;
