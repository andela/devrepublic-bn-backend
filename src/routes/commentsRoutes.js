import express from 'express';
import commentsController from '../controllers/commentController';
import validationResult from '../validation/validationResult';
import { commentRules } from '../validation/validationRules';
import protectRoute from '../middlewares/protectRoute';

const router = express.Router();

router.post('/:requestId/post', protectRoute.verifyUser, protectRoute.checkRequestDetails, commentRules, validationResult, commentsController.postComment);

export default router;
