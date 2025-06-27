const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models'); // Seu model User

describe('Testes de autenticação de usuários', () => {
    const usuarioTeste = {
        nameUser: 'Teste',
        lastNameUser: 'Usuário',
        email: `teste${Date.now()}@teste.com`,  // email único
        password: '123456',
    };

    beforeAll(async () => {
        // Limpar usuário se existir - opcional
        await User.destroy({ where: { email: usuarioTeste.email } });
    });

    it('deve registrar um novo usuário com sucesso', async () => {
        const res = await request(app).post('/user/register').send(usuarioTeste);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    it('deve fazer login com usuário registrado e retornar um token JWT', async () => {
        const res = await request(app).post('/user/login').send({
            email: usuarioTeste.email,
            password: usuarioTeste.password,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('deve retornar erro ao tentar logar com senha errada', async () => {
        const res = await request(app).post('/user/login').send({
            email: usuarioTeste.email,
            password: 'senha_errada',
        });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
});
