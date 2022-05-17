import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import tinify from 'tinify';

import { ErrorHandler } from '../error';

tinify.key = 'BjL1qKP7vTVgnbBPTJv37cZnHd9l78h2';

class FileService {
    async saveFile(file : UploadedFile) {
        try {
            const fileName = uuidv4() + path.extname(file.name);
            const picturePath = path.resolve('src/images', fileName);
            // const picturePath = path.join(process.cwd(), '/pictures', fileName);

            // eslint-disable-next-line consistent-return
            // await file.mv(picturePath, (err) => {
            //     if (err) {
            //         return new ErrorHandler(err.message);
            //     }
            //     console.log('File uploaded!');
            // });

            const source = await tinify.fromBuffer(file.data);

            const resized = await source.resize({
                method: 'cover',
                width: 70,
                height: 70,
            });

            await resized.toFile(picturePath, (err) => {
                if (err) {
                    throw new ErrorHandler(err.message);
                }
                console.log('File uploaded!');
            });

            return picturePath;
        } catch (e: any) {
            throw new ErrorHandler(e.message);
        }
    }
}

export const fileService = new FileService();
