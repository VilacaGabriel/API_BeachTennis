const userRepository = require('../repositories/userRepository');

const getAllUsers = async () => {
  return await userRepository.getAll();
};

const getUserById = async (id) => {
  return await userRepository.getById(id);
};

const createUser = async (data) => {
  return await userRepository.create(data);
};

const updateUser = async (id, data) => {
  return await userRepository.update(id, data);
};

const deleteUser = async (id) => {
  return await userRepository.remove(id);
};

module.exports = { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser };
