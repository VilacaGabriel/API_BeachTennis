# 🏖️ Beach Tennis API

API REST para gerenciamento de jogadores, partidas e estatísticas de jogos de Beach Tennis. Desenvolvida com **Node.js**, **Express** e **Sequelize**, utilizando **SQLite** como banco de dados. Realizada as novas alterações para cobertura dos testes unitários e Swagger como solicitado.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- Sequelize ORM
- SQLite (pode ser adaptado para outros DBs como MySQL/PostgreSQL)
- JSON Web Token (JWT) para autenticação
- Nodemon (ambiente de desenvolvimento)

## 📁 Estrutura do Projeto

```
├── app.js                  # Ponto de entrada da aplicação
├── config
│   └── database.js         # Configuração do Sequelize e SQLite
├── controllers             # Lógica dos endpoints
│   ├── userController.js
│   ├── playerController.js
│   └── gameController.js
├── middleware
│   └── autenticarToken.js  # Middleware JWT
├── models                  # Modelos Sequelize
│   ├── user.js
│   ├── player.js
│   ├── game.js
│   └── playerGame.js       # Tabela intermediária com estatísticas
│   └── indexModel.js       # Associações
├── repositories            # Acesso aos dados (camada de repositório)
│   ├── userRepository.js
│   ├── playerRepository.js
│   └── gameRepository.js
├── routes
│   ├── userRoutes.js
│   ├── playerRoutes.js
│   └── gameRoutes.js
└── README.md
```

## 🔐 Autenticação

A API utiliza JWT. Para acessar os endpoints protegidos, o usuário deve realizar login e incluir o token no cabeçalho da requisição:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

## 🧠 Modelos da API

### Usuário (`Users`)
- `id`
- `nameUser`
- `lastNameUser`
- `email` (único)
- `password` (criptografada)

### Jogador (`Players`)
- `id`
- `namePlayer`
- `lastNamePlayer`
- `gender`
- `numberPhone`
- `superCategory`
- `federationCategory`
- `club`
- `scoreTotal`

### Partida (`Games`)
- `id`
- `nameGame`
- `gameCategory`
- `statusGame` (padrão: "Em andamento")
- timestamps: `createdAt`, `updatedAt`

### Estatísticas de Jogadores em Partidas (`player_games`)
Relacionamento muitos-para-muitos com dados adicionais:

- `playerId` (chave primária)
- `gameId` (chave primária)
- `gamesPro`
- `saldoGames`
- `vitorias`
- `derrotas`

## 🛠️ Endpoints

### Usuários

| Método | Rota             | Descrição                  |
|--------|------------------|----------------------------|
| POST   | `/auth/login`    | Login e geração do token   |
| POST   | `/auth/register` | Registro de novo usuário   |

### Jogadores

| Método | Rota           | Descrição                  |
|--------|----------------|----------------------------|
| GET    | `/players`     | Listar jogadores           |
| POST   | `/players`     | Criar novo jogador         |
| PUT    | `/players/:id` | Atualizar jogador          |
| DELETE | `/players/:id` | Remover jogador            |

### Partidas

| Método | Rota                          | Descrição                                 |
|--------|-------------------------------|-------------------------------------------|
| GET    | `/games`                      | Listar todas as partidas                  |
| POST   | `/games`                      | Criar nova partida + associar jogadores   |
| GET    | `/games/:id`                  | Detalhes de uma partida (com jogadores)   |
| PUT    | `/games/:id`                  | Atualizar dados da partida                |
| DELETE | `/games/:id`                  | Remover partida                           |
| GET    | `/games/:id/players`          | Buscar jogadores da partida               |
| PUT    | `/games/:id/players/stats`    | Atualizar estatísticas dos jogadores      |

## 🧪 Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/beachtennis-api.git
   cd beachtennis-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode a API:
   ```bash
   npm run dev
   ```

4. Acesse:  
   ```
   http://localhost:3000
   ```

## ✅ Exemplo de JSON para criar uma partida

```json
{
  "nameGame": "Final Feminina",
  "gameCategory": "Feminino A",
  "players": [1, 2]
}
```

## ✅ Exemplo de JSON para atualizar estatísticas dos jogadores

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

## 📌 Observações

- A aplicação pode ser facilmente migrada para MySQL ou PostgreSQL.
- As tabelas são sincronizadas automaticamente ao iniciar o app com `sequelize.sync()`.
- Para a realização dos testes foi criado um front-end, para simular o consumo da API. Vai ser necessário o clone do front disponivel no github https://github.com/VilacaGabriel/FrontEnd-para-API.git . Sugestão de rodar o front-end pelo live sever e rodando a API pelo local host.

## 👨‍💻 Autor

Gabriel Felipe da Cruz Vilaça e Eduarda Dobre Dicalo
Estudantes de Engenharia de Software  
