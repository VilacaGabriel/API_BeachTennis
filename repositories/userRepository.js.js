const User = require('../models/user');

const getAll = () => User.findAll();

const getById = (id) => User.findByPk(id);

const create = (data) => User.create(data);

const update = (id, data) => User.update(data, { where: { id } });

const remove = (id) => User.destroy({ where: { id } });

module.exports = { getAll, getById, create, update, remove };
