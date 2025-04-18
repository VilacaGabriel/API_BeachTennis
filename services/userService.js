const userRepository = require('../repositories/userRepository');

const getAllUsers = () => userRepository.getAll();

const getUserById = (id) => userRepository.getById(id);

const createUser = (data) => userRepository.create(data);

const updateUser = (id, data) => userRepository.update(id, data);

const deleteUser = (id) => userRepository.remove(id);

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
