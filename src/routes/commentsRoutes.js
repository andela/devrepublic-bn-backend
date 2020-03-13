import express from 'express';
import commentsController from '../controllers/commentController';
import validationResult from '../validation/validationResult';
import { commentRules, commentIdRules } from '../validation/validationRules';
import protectRoute from '../middlewares/protectRoute';

const router = express.Router();

router.post('/:requestId/post', protectRoute.verifyUser, protectRoute.checkRequestDetails, commentRules, validationResult, commentsController.postComment);
router.delete('/:commentId', protectRoute.verifyUser, commentIdRules, validationResult, protectRoute.checkComment, commentsController.deleteComment);

export default router;
