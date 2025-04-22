// O arquivo userRepository.js concentra todas as operações de acesso ao banco de dados relacionadas ao modelo de usuários. Isso melhora a organização do código, separando a lógica de negócio (controladores) da persistência de dados (repositório). Ele inclui funções para listar, buscar por ID, criar, atualizar e deletar usuários.

const User = require('../models/user');

// Busca todos os usuários
const getAll = () => User.findAll();

// Busca um usuário pelo ID.
const getById = (id) => User.findByPk(id);

// Cria um novo usuário com os dados recebidos.
const create = (data) => User.create(data);

// Atualiza os dados do usuário com base no ID.
const update = (id, data) => User.update(data, { where: { id } });

// Remove o usuário com base no ID.
const remove = (id) => User.destroy({ where: { id } });

// Exporta todas as funções para que possam ser utilizadas em controladores ou serviços.
module.exports = { 
    getAll, 
    getById, 
    create, 
    update, 
    remove 
};
