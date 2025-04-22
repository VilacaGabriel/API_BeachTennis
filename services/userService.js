// O userService.js representa a camada de serviços da aplicação. Ela atua como intermediária entre o controlador e o repositório, facilitando a manutenção e organização do código. Mesmo que, por enquanto, só repasse as chamadas, essa camada está preparada para receber lógicas de negócio mais avançadas no futuro.

const userRepository = require('../repositories/userRepository');

// Essas funções são simples e estão repassando diretamente para o repositório. Cada uma faz o papel de intermediar as operações:
// Busca todos os usuários.
const getAllUsers = () => userRepository.getAll();

// Busca um usuário pelo ID.
const getUserById = (id) => userRepository.getById(id);

// Cria um novo usuário.
const createUser = (data) => userRepository.create(data);

// Atualiza um usuário com base no ID.
const updateUser = (id, data) => userRepository.update(id, data);

// Deleta um usuário.
const deleteUser = (id) => userRepository.remove(id);

// Exporta todas as funções para serem usadas em outros arquivos, como no userController.js.
module.exports = { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser };
