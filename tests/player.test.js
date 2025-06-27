require('dotenv').config(); // <-- importa variáveis do .env

const request = require('supertest');
const app = require('../src/app');
const { Player, User } = require('../src/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

describe('Testes da API Player', () => {
  let playerId;
  let token;

  const playerTeste = {
    namePlayer: 'Gabriel',
    lastNamePlayer: 'Vilaça',
    gender: 'M',
    numberPhone: '41999999999',
    superCategory: 'A',
    federationCategory: 'B',
    club: 'Neodent',
    scoreTotal: 0
  };

  beforeAll(async () => {
    let user = await User.findOne({ where: { email: 'teste@teste.com' } });
    if (!user) {
      const senhaHash = await bcrypt.hash('123456', 10);
      user = await User.create({
        nameUser: 'Teste',
        lastNameUser: 'User',
        email: 'teste@teste.com',
        password: senhaHash
      });
    }

    // Geração do token com fallback caso o JWT_SECRET não esteja definido
    token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'seuSegredoAqui',
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    if (playerId) {
      await Player.destroy({ where: { id: playerId } });
    }
  });

  test('Criar um novo player', async () => {
    const res = await request(app)
      .post('/players')
      .set('Authorization', `Bearer ${token}`)
      .send(playerTeste);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.namePlayer).toBe(playerTeste.namePlayer);

    playerId = res.body.id;
    console.log('ID do player criado:', playerId);
  });

  test('Buscar player pelo ID', async () => {
    expect(playerId).toBeDefined(); // Garantia que player foi criado

    const res = await request(app)
      .get(`/players/${playerId}`)
      .set('Authorization', `Bearer ${token}`);

    console.log('Resposta ao buscar player:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('namePlayer', playerTeste.namePlayer);
  });

  test('Atualizar dados do player', async () => {
    const res = await request(app)
      .put(`/players/${playerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ club: 'MadeiraMadeira' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('club', 'MadeiraMadeira');
  });

  test('Deletar o player', async () => {
    const res = await request(app)
      .delete(`/players/${playerId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
