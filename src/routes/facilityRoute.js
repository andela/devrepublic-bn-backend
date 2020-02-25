import express from 'express';
import FacilitiesController from '../controllers/facilitiesController';
import protectRoute from '../middlewares/protectRoute';
import { createFacilityRules } from '../validation/validationRules';
import validationResult from '../validation/validationResult';
import { multerUploads } from '../utils/multer';

const router = express.Router();

router.post('/', protectRoute.verifyUser, protectRoute.verifyTripAdminOrSupplier, multerUploads, createFacilityRules, validationResult, FacilitiesController.createFacility);
router.post('/room', protectRoute.verifyUser, protectRoute.verifyTripAdminOrSupplier, FacilitiesController.createRoom);

export default router;
