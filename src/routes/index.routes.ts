import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import chatRoutes from './chat.routes';
import messageRoutes from './message.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/chats', chatRoutes);
router.use('/messages', messageRoutes);

export default router;
