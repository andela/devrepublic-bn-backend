import express from 'express';
import validationResult from '../validation/validationResult';
import notificationController from '../controllers/notificationController';
import protectRoute from '../middlewares/protectRoute';

const router = express.Router();

router.patch('/all-read', protectRoute.verifyUser, protectRoute.checkUnreadNotifications, validationResult, notificationController.markAllNotificationsAsRead);

export default router;
