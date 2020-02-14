import express from 'express';
import AuthController from '../controllers/authController';
import verificationController from '../controllers/verificationController';
import validateParams from '../validation/validateParams';
import validationResult from '../validation/validationResult';
import signupInputRules from '../validation/validationRules';


const authRouter = express.Router();

authRouter.post('/register', signupInputRules, validationResult, AuthController.registerUser);
authRouter.get('/verification', validateParams.validateToken, verificationController.verifyAccount);
authRouter.post('/login', AuthController.login);

export default authRouter;
