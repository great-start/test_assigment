import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Users, Token } from './entity';

export const appDataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'ev',
    password: '4022',
    database: 'node_pg',
    synchronize: true,
    logging: false,
    entities: [Users, Token],
    // subscribers: [],
    migrations: ['src/migration/*.{js,ts}'],
});
