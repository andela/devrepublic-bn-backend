import os from 'os';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import { Router } from 'express';

const router = Router();

// Set up

const swaggerDef = {
  definition: {
    info: {
      title: 'Barefoot Nomad - DevRepublic',
      version: '1.0.0',
      description:
            'A platform to make company global travel and accommodation easy and convenient for strongwork force of savvy member'
    },
    servers: [
      {
        url: 'http://localhost:8000',
        name: `${os.hostname()}`
      },
      {
        url: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
        name: `${os.hostname()}`
      }
    ]
  },
  // apis list
  apis: ['../**/api/*.js', 'welcome.js']
};

const swaggerDoc = swaggerJSDoc(swaggerDef);

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDoc);
});

router.use('/api-doc', swaggerui.serve, swaggerui.setup(swaggerDoc));

export default router;
