import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { appDataSource } from '../data-source';
import { Token } from '../entity';
import { config } from '../config';

class TokenController {
    async getToken(req: Request, res: Response) {
        const accessToken = jwt.sign(
            { payload: new Date().getMilliseconds() },
            config.SECRET_KEY as string,
            { expiresIn: '1d' },
        );

        await appDataSource.createQueryBuilder()
            .insert()
            .into(Token)
            .values([{ accessToken }])
            .execute();

        res.json({
            message: 'true',
            token: accessToken,
        });
    }
}

export const tokenController = new TokenController();
