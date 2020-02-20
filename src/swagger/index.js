import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const swaggerDef = {
  definition: {
    info: {
      title: 'Barefoot Nomad - DevRepublic',
      version: '1.0.0',
      description:
            'A platform to make company global travel and accommodation easy and convenient for strongwork force of savvy member'
    },
    host: process.env.BASE_URL,
  },
  apis: ['./src/swagger/*.swagger.js']
};

const swaggerDoc = swaggerJSDoc(swaggerDef);

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDoc);
});

router.use('/', swaggerui.serve, swaggerui.setup(swaggerDoc));

export default router;
