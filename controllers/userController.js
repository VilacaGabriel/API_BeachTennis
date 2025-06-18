const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const JWT_SECRET = 'seuSegredoAqui'; // coloque em variável ambiente para produção
const JWT_EXPIRES_IN = '1h';

// Cria novo usuário com senha criptografada
const create = async (req, res) => {
  const { nameUser, lastNameUser, email, password } = req.body;

  if (!nameUser || !email || !password) {
    return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios.' });
  }

  try {
    // Verifica se já existe usuário com esse email
    const usuarioExistente = await userRepository.getByEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ erro: 'E-mail já cadastrado.' });
    }

    // Logs de depuração
    console.log("Tentando login com:", email);
    console.log("Senha recebida:", password);

    const novoUsuario = await userRepository.create({
      nameUser,
      email,
      lastNameUser,
      password
    });

    // Não envie a senha no retorno
    const { password: _, ...usuarioSemSenha } = novoUsuario.toJSON();
    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ erro: 'Erro interno ao criar usuário.' });
  }
};

// Verifica login comparando senha com hash e gera token JWT
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
  }

  try {
    // Busque usuário diretamente pelo email
    const usuario = await userRepository.getByEmail(email);

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado.' });
    }
    console.log("Tipo da senha:", typeof password);
    console.log("Tipo da hash:", typeof usuario.password);
    console.log("Hash recebida do banco:", usuario.password);

    const senhaValida = await bcrypt.compare(String(password), usuario.password);
    console.log("Senha válida?", senhaValida);
    console.log("Senha recebida:", password);
    console.log("Tipo da senha:", typeof password);
    console.log("Senha como string:", String(password));

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida.' });
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nameUser: usuario.nameUser },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ mensagem: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno no login.' });
  }
};

module.exports = {
  create,
  login
};
