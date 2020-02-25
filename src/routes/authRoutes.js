import express from 'express';
import passport from 'passport';
import AuthController from '../controllers/authController';
import validationResult from '../validation/validationResult';
import verificationController from '../controllers/verificationController';
import validateParams from '../validation/validateParams';
import { signupInputRules, resetPasswordRules, forgotPasswordRules } from '../validation/validationRules';
import protectRoute from '../middlewares/protectRoute';

const authRouter = express.Router();

authRouter.post('/register', signupInputRules, validationResult, AuthController.registerUser);
authRouter.get('/verification', validateParams.validateToken, verificationController.verifyAccount);
authRouter.post('/login', AuthController.login);
authRouter.get('/logout', AuthController.logout);

authRouter.put('/password/forgot', forgotPasswordRules, validationResult, AuthController.forgotPassword);
authRouter.put('/password/reset', protectRoute.verifyUser, resetPasswordRules, validationResult, AuthController.resetPassword);
authRouter.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));

authRouter.get('/google/redirect', passport.authenticate('google'), AuthController.oAuthLogin);


authRouter.get('/facebook', passport.authenticate('facebook', {
  scope: [],
  cookieSession: false
}));


authRouter.get('/facebook/redirect', passport.authenticate('facebook'), AuthController.oAuthLogin);

export default authRouter;
