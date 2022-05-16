import { Request, Response } from 'express';

import { appDataSource } from '../data-source';
import { Token } from '../entity';
import { tokenService } from '../services/token.service';

class TokenController {
    public async getToken(req: Request, res: Response) {
        const accessToken = await tokenService.getToken();

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
