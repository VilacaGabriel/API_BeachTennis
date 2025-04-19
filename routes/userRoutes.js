const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // esse caminho precisa estar certo

//Rota POST para criar novos usuarios
router.post('/users', userController.createUser);


//Rota GET para listar usuarios no banco
router.get('/users', userController.getAllUsers)

//Rota PUT para alterar um usuario
router.put('/users:id',userController.updateUser);

//Rota DELETE para deletar um usuario
router.delete('/users:id',userController.deleteUser);

module.exports = router;
