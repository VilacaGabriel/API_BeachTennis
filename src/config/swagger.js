const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Beach Tennis API',
      version: '1.0.0',
      description: 'API para gerenciamento de jogadores, usuários e partidas de Beach Tennis.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], // aponta para as rotas onde colocaremos os comentários Swagger
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
