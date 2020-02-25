import express from 'express';
import tripsController from '../controllers/tripsController';
import { requestRules, returnTripRules, multiCityTripRules } from '../validation/validationRules';
import validationResult from '../validation/validationResult';
import protectRoute from '../middlewares/protectRoute';

const router = express.Router();

router.post('/one-way', protectRoute.verifyUser, protectRoute.verifyRequester, requestRules, validationResult, tripsController.createRequest);
router.post('/return', protectRoute.verifyUser, protectRoute.verifyRequester, returnTripRules, validationResult, tripsController.createReturnRequest);
router.patch('/edit', protectRoute.verifyUser, protectRoute.verifyRequester, requestRules, validationResult, tripsController.editRequest);
router.post('/multi-city', protectRoute.verifyUser, protectRoute.verifyRequester, multiCityTripRules, validationResult, tripsController.createMultiCityRequest);
export default router;
