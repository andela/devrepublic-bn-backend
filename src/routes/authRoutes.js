import express from 'express';
import AuthController from '../controllers/authController';
import validationResult from '../validation/validationResult';
import signupInputRules from '../validation/validationRules';
import verificationController from '../controllers/verificationController';

const authRouter = express.Router();

authRouter.post('/register', signupInputRules, validationResult, AuthController.registerUser);
authRouter.get('/verification', verificationController.verifyAccount);
authRouter.post('/login', AuthController.login);

export default authRouter;
