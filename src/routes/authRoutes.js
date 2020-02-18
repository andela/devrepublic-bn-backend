import express from 'express';
import AuthController from '../controllers/authController';
import validationResult from '../validation/validationResult';
import { signupInputRules } from '../validation/validationRules';
import verificationController from '../controllers/verificationController';
import validateParams from '../validation/validateParams';

const authRouter = express.Router();

authRouter.post('/register', signupInputRules, validationResult, AuthController.registerUser);
authRouter.get('/verification', validateParams.validateToken, verificationController.verifyAccount);
authRouter.post('/login', AuthController.login);
authRouter.get('/logout', AuthController.logout);

export default authRouter;
