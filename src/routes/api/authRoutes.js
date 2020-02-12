import express from 'express';
import AuthController from '../../controllers/authController';
import DatabaseSearch from '../../utils/searchInDatabase';


const authRouter = express.Router();
authRouter.post('/register', DatabaseSearch.finduser, AuthController.registerUser);

export default authRouter;
