import { Router } from 'express';

const router = Router();

/**
 * @swagger
 *
 * /:
 *  get:
 *   description: Welcome message for users
 *   responses:
 *     '200':
 *       description: 'Welcome to Barefoot Nomad'
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to devRepublic Barefoot Nomad API'
  });
});

export default router;
