import express from 'express';
import tripsController from '../controllers/tripsController';
import { requestRules } from '../validation/validationRules';
import validationResult from '../validation/validationResult';
import { verifyRequester } from '../middlewares/verifyUser';
import { decode } from '../utils/tokenHandler';

const router = express.Router();

router.post('/one-way', decode, verifyRequester, requestRules, validationResult, tripsController.createRequest);

export default router;
