import { Request, NextFunction, Response } from 'express';

import { appDataSource } from '../data-source';
import { Users } from '../entity';
import { ErrorHandler } from '../error';

class UserMiddleware {
    async checkIsUserExist(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, phone } = req.body;

            const userFromDB = await appDataSource
                .createQueryBuilder()
                .select('user')
                .from(Users, 'user')
                .where('user.email = :email OR user.phone = :phone', { email, phone })
                .getOne();

            if (userFromDB) {
                next(new ErrorHandler('User with this phone or email already exist', false, 404));
                return;
            }

            // req.user = userFromDB;
            next();
        } catch (e: any) {
            next(new ErrorHandler(e.message));
        }
    }
}

export const userMiddleware = new UserMiddleware();
