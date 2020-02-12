import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Display welcome message
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Welcome to devRepublic Barefoot Nomad API
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to devRepublic Barefoot Nomad API'
  });
});

export default router;
