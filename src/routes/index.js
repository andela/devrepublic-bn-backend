import express from 'express';
import finalOutput from '../controllers/index';
import validationResult from '../validation/validationResult';
import signupInputRules from '../validation/validationRules';

const route = express.Router();

route.post('/inputs', signupInputRules, validationResult, finalOutput);
export default route;
