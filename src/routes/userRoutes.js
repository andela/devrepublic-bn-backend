import express from 'express';
import { multerUploads } from '../utils/multer';
import userController from '../controllers/userController';
import validationResult from '../validation/validationResult';
import { changeRoles, editProfileValidationRules } from '../validation/validationRules';
import { decode } from '../utils/tokenHandler';


const userRouter = express.Router();

userRouter.patch('/setRoles', decode, changeRoles, validationResult, userController.setRoles);
userRouter.patch('/edit-profile', decode, editProfileValidationRules, validationResult, userController.editProfile);
userRouter.get('/view-profile', decode, userController.viewProfile);
userRouter.post('/edit-profile-image', decode, multerUploads, userController.uploadProfileImage);
userRouter.patch('/assign/manager', decode, userController.assignManager);

export default userRouter;
