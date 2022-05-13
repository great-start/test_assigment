import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import path from 'path';

import { ErrorHandler } from '../error';

class FileService {
    async saveFile(file : UploadedFile) {
        const fileName = uuidv4() + path.extname(file.name);
        const picturePath = path.resolve('src/images', fileName);
        // const picturePath = path.join(process.cwd(), '/pictures', fileName);

        // eslint-disable-next-line consistent-return
        await file.mv(picturePath, (err) => {
            if (err) {
                return new ErrorHandler(err.message);
            }
            console.log('File uploaded!');
        });

        return picturePath;
    }
}

export const fileService = new FileService();
