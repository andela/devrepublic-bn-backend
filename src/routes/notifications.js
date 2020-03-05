import express from 'express';
import validationResult from '../validation/validationResult';
import notificationController from '../controllers/notificationController';
import protectRoute from '../middlewares/protectRoute';

const router = express.Router();

router.patch('/all-read', protectRoute.verifyUser, protectRoute.checkUnreadNotifications, validationResult, notificationController.markAllNotificationsAsRead);
router.patch('/email-opt-out', protectRoute.verifyUser, validationResult, notificationController.optOutEmailNotifications);
router.patch('/email-opt-in', protectRoute.verifyUser, validationResult, notificationController.optInEmailNotifications);

export default router;
