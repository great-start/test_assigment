import { Router } from 'express';
import { positionController } from '../controllers';

const router = Router();

router.get('/', positionController.getAll);

export const positionRouter = router;
