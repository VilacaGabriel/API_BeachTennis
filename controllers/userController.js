// controllers/userController.js
const User = require('../models/user');

//Função para criar os Usuarios
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}
//Funcação para listar usuarios
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();  // Usando Sequelize para pegar todos os usuários
    res.status(200).json(users);  // Retorna os usuários com o status 200
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}
// Função para atualizar um usuário
async function updateUser(req, res) {
  const { id } = req.params;  // Obtém o id dos parâmetros da URL
  const data = req.body;      // Obtém os dados de atualização do corpo da requisição

  try {
    // Atualiza o usuário
    const [updated] = await User.update(data, {
      where: { id }
    });

    if (updated) {
      const updatedUser = await User.findByPk(id);  // Recupera o usuário atualizado
      res.status(200).json(updatedUser);  // Retorna o usuário atualizado
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}
//Função para deletar um usuraio
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.destroy();

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
};
