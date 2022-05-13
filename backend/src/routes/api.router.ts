import { Router } from 'express';

import { userRouter } from './user.router';
import { tokenRouter } from './token.router';
import { positionRouter } from './positions.router';

const router = Router();

router.use('/users', userRouter);
router.use('/tokens', tokenRouter);
router.use('/positions', positionRouter);

export const apiRouter = router;
