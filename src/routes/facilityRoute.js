import express from 'express';
import FacilitiesController from '../controllers/facilitiesController';
import protectRoute from '../middlewares/protectRoute';
import { createFacilityRules } from '../validation/validationRules';
import validationResult from '../validation/validationResult';
import { multerUploads } from '../utils/multer';
import alreadyLiked from '../utils/alreadyLiked';
import alreadyUnliked from '../utils/alreadyUnliked';

const router = express.Router();

router.post('/', protectRoute.verifyUser, protectRoute.verifyTripAdminOrSupplier, multerUploads, createFacilityRules, validationResult, FacilitiesController.createFacility);
router.post('/room', protectRoute.verifyUser, protectRoute.verifyTripAdminOrSupplier, FacilitiesController.createRoom);
router.patch('/like', protectRoute.verifyUser, protectRoute.verifyFacility, protectRoute.checkIfLiked, alreadyUnliked, FacilitiesController.likeFacility);
router.patch('/unlike', protectRoute.verifyUser, protectRoute.verifyFacility, protectRoute.checkIfUnliked, alreadyLiked, FacilitiesController.unlikeFacility);

export default router;
