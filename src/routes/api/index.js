import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import { Router } from 'express';
import swaggerDef from '../../swagger/index';
import welcome from './welcome';

const routes = Router();

const swaggerDoc = swaggerJSDoc(swaggerDef);

routes.use('/devrepublic-api', swaggerui.serve, swaggerui.setup(swaggerDoc));
// console.log(welcome);
routes.use(welcome);

export default routes;
