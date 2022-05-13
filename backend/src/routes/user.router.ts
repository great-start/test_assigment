import { Router } from 'express';

import { userController } from '../controllers';
import { authMiddleware } from '../middlewares';
import { userMiddleware } from '../middlewares/user.middleware';
import { filesMiddleware } from '../middlewares/files.middleware';

const router = Router();

router.get('/', userController.getUserPagination);
router.post(
    '/',
    authMiddleware.checkAccessToken,
    authMiddleware.loginValidate,
    userMiddleware.checkIsUserExist,
    filesMiddleware.checkFile,
    userController.registerUser,
);
router.get('/:id', userController.getUserById);

export const userRouter = router;
