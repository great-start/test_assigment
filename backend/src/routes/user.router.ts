import { Router } from 'express';

import { userController } from '../controllers';
import {authMiddleware, filesMiddleware, userMiddleware} from '../middlewares';

const router = Router();

router.get('/', userController.getUserPagination);
router.post('/',
    authMiddleware.checkAccessToken,
    authMiddleware.loginValidate,
    userMiddleware.checkIsUserExist,
    filesMiddleware.checkFile,
    userController.registerUser,
);
router.get('/:id', userController.getUserById);

export const userRouter = router;
