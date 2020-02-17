import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: res.__('Welcome to devRepublic Barefoot Nomad API')
  });
});

export default router;
