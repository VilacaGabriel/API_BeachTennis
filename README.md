# 🏖️ Beach Tennis API

API REST para gerenciamento de **jogadores**, **partidas** e **estatísticas** de jogos de Beach Tennis.

Desenvolvida com **Node.js**, **Express** e **Sequelize**, utilizando **SQLite** como banco de dados. A API implementa **autenticação JWT**, documentação via **Swagger**, testes unitários com **100% de cobertura** e integração contínua com **GitHub Actions**.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- Sequelize (ORM)
- SQLite (adaptável para MySQL/PostgreSQL)
- JSON Web Token (JWT)
- Nodemon (dev)
- Jest (testes)
- Swagger (documentação)
- GitHub Actions (CI/CD)

---

## 📁 Estrutura do Projeto

```bash
.
├── database.sqlite
├── package.json
├── README.md
├── src
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── gameController.js
│   │   ├── playerController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── autenticarToken.js
│   ├── models/
│   │   ├── gameModel.js
│   │   ├── playerModel.js
│   │   ├── playerGame.js
│   │   ├── userModel.js
│   │   └── index.js
│   ├── repositories/
│   │   ├── gameRepository.js
│   │   ├── playerRepository.js
│   │   └── userRepository.js
│   ├── routes/
│   │   ├── gameRoutes.js
│   │   ├── playerRoutes.js
│   │   └── userRoutes.js
│   └── services/
│       ├── playerService.js
│       └── userService.js
├── tests/
│   ├── game.test.js
│   ├── player.test.js
│   └── user.test.js
└── .github/
    └── workflows/
        └── ci.yml
```

---

## 🔐 Autenticação

A API utiliza **JWT**. Após o login, é necessário incluir o token no cabeçalho das requisições protegidas:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 🧠 Modelos da API

### 👤 Usuário (`Users`)
- `id`
- `nameUser`
- `lastNameUser`
- `email` (único)
- `password` (criptografada)

### 🎾 Jogador (`Players`)
- `id`
- `namePlayer`
- `lastNamePlayer`
- `gender`
- `numberPhone`
- `superCategory`
- `federationCategory`
- `club`
- `scoreTotal`

### 🏆 Partida (`Games`)
- `id`
- `nameGame`
- `gameCategory`
- `statusGame` (padrão: "Em andamento")
- `createdAt`, `updatedAt`

### 📊 Estatísticas (`player_games`)
Relacionamento muitos-para-muitos com dados adicionais:

- `playerId` (PK)
- `gameId` (PK)
- `gamesPro`
- `saldoGames`
- `vitorias`
- `derrotas`

---

## 📄 Endpoints

### 🔐 Usuários

| Método | Rota             | Descrição                |
|--------|------------------|--------------------------|
| POST   | /auth/login      | Login e geração de token |
| POST   | /auth/register   | Registro de novo usuário |

### 👥 Jogadores

| Método | Rota            | Descrição              |
|--------|------------------|-------------------------|
| GET    | /players         | Listar jogadores        |
| POST   | /players         | Criar novo jogador      |
| PUT    | /players/:id     | Atualizar jogador       |
| DELETE | /players/:id     | Remover jogador         |

### 🏆 Partidas

| Método | Rota                              | Descrição                           |
|--------|-----------------------------------|-------------------------------------|
| GET    | /games                            | Listar todas as partidas            |
| POST   | /games                            | Criar nova partida + jogadores      |
| GET    | /games/:id                        | Detalhes de uma partida             |
| PUT    | /games/:id                        | Atualizar dados da partida          |
| DELETE | /games/:id                        | Remover partida                     |
| GET    | /games/:id/players                | Buscar jogadores da partida         |
| PUT    | /games/:id/players/stats          | Atualizar estatísticas dos jogadores|

---

## 🧪 Testes

Para rodar os testes:

```bash
npm test
```

Para gerar o relatório de cobertura:

```bash
npm run test:coverage
```

✅ Cobertura de testes: **100%**

---

## 📄 Documentação Swagger

Documentação interativa da API disponível em:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## ✅ Exemplos de Requisições

### Criar partida

```json
{
  "nameGame": "Final Feminina",
  "gameCategory": "Feminino A",
  "players": [1, 2]
}
```

### Atualizar estatísticas dos jogadores

```json
{
  "1": {
    "vitorias": 1,
    "derrotas": 0,
    "saldo": 3,
    "gamespro": 6
  },
  "2": {
    "vitorias": 0,
    "derrotas": 1,
    "saldo": -3,
    "gamespro": 3
  }
}
```

---

## 🌐 Front-end (para testes)

Um front-end de testes está disponível em:

🔗 [https://github.com/VilacaGabriel/FrontEnd-para-API](https://github.com/VilacaGabriel/FrontEnd-para-API)

**Como usar:**
- Clone o repositório
- Abra com Live Server (VS Code)
- Rode a API localmente em `http://localhost:3000`

---

## ⚙️ CI/CD

O projeto utiliza **GitHub Actions** para rodar testes automaticamente a cada push ou PR.

---

## 👨‍💻 Autores

- **Gabriel Felipe da Cruz Vilaça**
- **Eduarda Dobre Dicalo**

Estudantes de Engenharia de Software — 6º período
