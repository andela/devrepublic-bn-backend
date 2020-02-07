import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

// Set up

const swaggerDef = {
  swaggerDef: {
    info: {
      title: 'Barefoot Nomad(DevRepublic)',
      version: '1.0.0',
      description:
            'A platform to make company global travel and accommodation easy and convenient for strongwork force of savvy member'
    },
    host: process.env.BASE_URL,
    basePath: '/'
  },
  // apis list
  apis: ['./src/routes/*.js']
};
const settings = {
  swaggerDef,
  apis: ['./src/swagger/*.swagger.js']
};
const swaggerDoc = swaggerJSDoc(settings);
const regisSwagger = (app) => { app.use('/docs', swaggerui.serve, swaggerui.setup(swaggerDoc)); };

export default regisSwagger;
