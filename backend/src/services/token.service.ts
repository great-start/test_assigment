import jwt from 'jsonwebtoken';
import { config } from '../config';

class TokenService {
    async getToken() {
        return this._generateToken();
    }

    private _generateToken() {
        return jwt.sign(
            { payload: new Date().getMilliseconds() },
            config.SECRET_KEY as string,
            { expiresIn: '40m' },
        );
    }
}

export const tokenService = new TokenService();
