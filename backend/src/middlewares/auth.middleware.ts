import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { authValidator } from '../validators/auth.validators';
import { ErrorHandler } from '../error';
import { appDataSource } from '../data-source';
import { Token } from '../entity';
import { config } from '../config';

class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.get('Token');

            if (!token) {
                next(new ErrorHandler('No token'));
            }

            const tokenFromDB = await appDataSource.createQueryBuilder()
                .createQueryBuilder()
                .select('token')
                .from(Token, 'token')
                .where('token.accessToken = :token', { token })
                .getOne();

            if (!tokenFromDB) {
                next(new ErrorHandler('Token not valid', false, 401));
            }

            jwt.verify(token as string, config.SECRET_KEY as string, (e) => {
                if (e) {
                    next(new ErrorHandler('The token expired.', false, 401));
                }
            });

            next();
        } catch (e) {
            next(e);
        }
    }

    public loginValidate(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                // eslint-disable-next-line camelcase
                name, email, phone, position_id,
            } = req.body;

            const { error } = authValidator.validate({
                // eslint-disable-next-line camelcase
                name, email, phone, position_id,
            });

            if (error) {
                next(new ErrorHandler(error.details[0].message));
            }

            next();
        } catch (e: any) {
            next(new ErrorHandler(e.message));
        }
    }
}

export const authMiddleware = new AuthMiddleware();
