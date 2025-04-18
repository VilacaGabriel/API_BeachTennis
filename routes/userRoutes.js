const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // esse caminho precisa estar certo

router.post('/users', userController.createUser);

module.exports = router;
