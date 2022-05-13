import { Request, NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { constants } from '../constants';
import { ErrorHandler } from '../error';

class FilesMiddleware {
    async checkFile(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.files?.photo);

            if (!req.files?.photo) {
                next(new ErrorHandler('No file', false, 422));
                return;
            }

            const { size, mimetype } = req.files.photo as UploadedFile;

            if (size > constants.PHOTO_MAX_SIZE) {
                next(new ErrorHandler('The photo may not be greater than 5 Mbytes.', false, 422));
                return;
            }

            if (!constants.PHOTOS_MIMETYPE.includes(mimetype)) {
                next(new ErrorHandler('Wrong file format. Image is invalid.', false, 422));
                return;
            }

            next();
        } catch (e: any) {
            next(new ErrorHandler(e.message));
        }
    }
}

export const filesMiddleware = new FilesMiddleware();
