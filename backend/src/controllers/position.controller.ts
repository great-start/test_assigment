import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../error';

class PositionController {
    public getAll(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({
                success: true,
                positions: [
                    {
                        id: 1,
                        name: 'Security',
                    },
                    {
                        id: 2,
                        name: 'Designer',
                    },
                    {
                        id: 3,
                        name: 'Content manager',
                    },
                    {
                        id: 4,
                        name: 'Lawyer',
                    },
                ],
            });
        } catch (e) {
            next(new ErrorHandler('Page not found', false, 404));
        }
    }
}

export const positionController = new PositionController();
