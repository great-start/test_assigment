import { NextFunction, Request, Response } from 'express';

import { ErrorHandler } from '../error';
import { positionService } from '../services';

class PositionController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const positions = await positionService.getAllPositions();

            res.json({
                success: true,
                positions,
            });
        } catch (e) {
            next(new ErrorHandler('Page not found', false, 404));
        }
    }
}

export const positionController = new PositionController();
