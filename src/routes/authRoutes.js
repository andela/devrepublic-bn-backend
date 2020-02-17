import express from 'express';
import AuthController from '../controllers/authController';
import validationResult from '../validation/validationResult';
import verificationController from '../controllers/verificationController';
import validateParams from '../validation/validateParams';
import { signupInputRules, resetPasswordRules, forgotPasswordRules } from '../validation/validationRules';

import verifyUser from '../middlewares/verifyUser';

const authRouter = express.Router();

authRouter.post('/register', signupInputRules, validationResult, AuthController.registerUser);
authRouter.get('/verification', validateParams.validateToken, verificationController.verifyAccount);
authRouter.post('/login', AuthController.login);
authRouter.get('/logout', AuthController.logout);

authRouter.put('/forgotPassword', forgotPasswordRules, validationResult, AuthController.forgotPassword);
authRouter.put('/resetpassword', verifyUser, resetPasswordRules, validationResult, AuthController.resetPassword);
export default authRouter;
