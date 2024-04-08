import { Router } from 'express';
import { allUsers } from '../controllers/user.controller';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/').get(protect, allUsers);

export default router;
