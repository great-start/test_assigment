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
                return;
            }

            const tokenFromDB = await appDataSource.createQueryBuilder()
                .createQueryBuilder()
                .select('token')
                .from(Token, 'token')
                .where('token.accessToken = :token', { token })
                .getOne();

            if (!tokenFromDB) {
                next(new ErrorHandler('Token not valid', false, 401));
                return;
            }

            jwt.verify(token as string, config.SECRET_KEY as string, (e: any) => {
                if (e) {
                    next(new ErrorHandler('The token expired.', false, 401));
                    return;
                }
            });

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public loginValidate(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, phone, positionId } = req.body;

            const { error } = authValidator.validate({ name, email, phone, positionId });

            if (error) {
                next(new ErrorHandler('Validation failed', false, 422,
                        {
                            message: error.details[0].message
                        }
                    )
                );
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
