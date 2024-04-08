import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { allMessages, sendMessage } from '../controllers/message.controllers';

const router = Router();

router.route('/:chatId').get(protect, allMessages);
router.route('/').post(protect, sendMessage);

export default router;
