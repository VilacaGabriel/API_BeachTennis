require('dotenv').config();
const request = require('supertest');
const app = require('../src/app'); // Ajuste o caminho conforme seu projeto

let token;  // Token JWT para autenticação
let gameId; // Armazena o ID do jogo criado para testes subsequentes

describe('Testes rotas /games', () => {
  beforeAll(async () => {
    // Registra um usuário para login e gerar token
    const usuarioTeste = {
      nameUser: "Teste",
      lastNameUser: "Jogador",
      email: "teste.games@teste.com",
      password: "123456"
    };
    
    await request(app).post('/user/register').send(usuarioTeste);
    
    const loginRes = await request(app).post('/user/login').send({
      email: usuarioTeste.email,
      password: usuarioTeste.password
    });

    token = loginRes.body.token;
  });

  it('deve criar um novo jogo', async () => {
    const novoJogo = {
      nameGame: 'Jogo Teste',
      gameCategory: 'Amador'
    };

    const res = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${token}`)
      .send(novoJogo);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nameGame).toBe(novoJogo.nameGame);

    gameId = res.body.id; // salva para testes futuros
  });

  it('deve retornar todos os jogos', async () => {
    const res = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve retornar o jogo pelo ID', async () => {
    const res = await request(app)
      .get(`/games/${gameId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', gameId);
  });

  it('deve atualizar o jogo pelo ID', async () => {
    const dadosAtualizados = {
      nameGame: 'Jogo Teste Atualizado',
      gameCategory: 'Profissional'
    };

    const res = await request(app)
      .put(`/games/${gameId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dadosAtualizados);

    expect(res.statusCode).toBe(200);
    expect(res.body.nameGame).toBe(dadosAtualizados.nameGame);
  });

  it('deve deletar o jogo pelo ID', async () => {
    const res = await request(app)
      .delete(`/games/${gameId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204); // No content
  });

  it('deve retornar 404 ao buscar jogo deletado', async () => {
    const res = await request(app)
      .get(`/games/${gameId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });
});
