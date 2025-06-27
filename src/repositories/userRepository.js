const User = require('../models/userModel');

const getAll = async () => {
  return await User.findAll();
};

const getById = async (id) => {
  return await User.findByPk(id);
};

const getByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const create = async (data) => {
  return await User.create(data);
};

const update = async (id, data) => {
  const [updatedRowsCount] = await User.update(data, { where: { id } });
  if (updatedRowsCount === 0) {
    throw new Error('Usuário não encontrado');
  }
  return await getById(id); // retorna o usuário atualizado
};

const remove = async (id) => {
  const deletedRowsCount = await User.destroy({ where: { id } });
  if (deletedRowsCount === 0) {
    throw new Error('Usuário não encontrado');
  }
  return true;
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  remove
};
