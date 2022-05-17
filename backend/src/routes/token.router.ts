import { Router } from 'express';

import { tokenController } from '../controllers';

const router = Router();

router.get('/', tokenController.getToken);

export const tokenRouter = router;
