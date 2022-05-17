import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';

import { appDataSource } from './data-source';
import { config } from './config';
import { apiRouter } from './routes';

const app: express.Application = express();

app.use(express.json({}));
app.use(express.static('images'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ uploadTimeout: 10 }));
app.use(apiRouter);

app.use((req: Request, res: Response) => {
    res.send('Page not Found');
});

// @ts-ignore
app.use('*', (err, req, res, next) => {
    if (Object.keys(err.fails).length !== 0) {
        res
            .status(err.status || 500)
            .json({
                success: err.success,
                message: err.message,
                fails: err.fails,
            });
    } else {
        res
            .status(err.status || 500)
            .json({
                success: err.success,
                message: err.message,
            });
    }
});

app.listen(config.PORT, async () => {
    try {
        await appDataSource.initialize();
        await appDataSource.runMigrations();
        console.log('Data Source has been initialized!');
    } catch (e) {
        console.error('Error during Data Source initialization:', e);
    }
    console.log(`Server start at PORT ${config.PORT}!!!!!`);
});
