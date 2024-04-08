import { Router } from 'express';
import { allUsers } from '../controllers/user.controller';

const router = Router();

router.route('/').get(allUsers);

export default router;
