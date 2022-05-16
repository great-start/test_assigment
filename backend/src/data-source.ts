import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Users, Token, Positions } from './entity';
import { config } from './config';

export const appDataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Users, Token, Positions],
    // subscribers: [],
    migrations: ['src/migration/*.{js,ts}'],
});
