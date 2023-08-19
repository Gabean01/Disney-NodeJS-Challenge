const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'My API Information',
            contact: {
                name: 'Gary Bean'
            },
            servers: ['http://localhost:8080']
        }
    },
    apis: ['./my-disney-api/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;