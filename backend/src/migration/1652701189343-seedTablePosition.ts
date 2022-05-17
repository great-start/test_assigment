import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedTablePosition1652701189343 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO positions (name) VALUES ('security'), ('designer'), ('content manager'), ('lawyer');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            TRUNCATE positions
        `);
    }
}
