import express from 'express';
import AuthController from '../controllers/authController';
import validationResult from '../validation/validationResult';
import signupInputRules from '../validation/validationRules';

const authRouter = express.Router();

authRouter.post('/register', signupInputRules, validationResult, AuthController.registerUser);
export default authRouter;
