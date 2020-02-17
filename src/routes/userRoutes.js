import express from 'express';
import userController from '../controllers/userController';
import validationResult from '../validation/validationResult';
import { changeRoles } from '../validation/validationRules';
import { decode } from '../utils/tokenHandler';

const userRouter = express.Router();

userRouter.patch('/setRoles', decode, changeRoles, validationResult, userController.setRoles);

export default userRouter;
