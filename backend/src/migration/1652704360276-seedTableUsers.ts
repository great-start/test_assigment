import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedTableUsers1652704360276 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users (name,email,phone,photo,"positionId") VALUES 
                ('Vanya','asd@gmail.com','+380501234567','/asd/photo.jpeg',4),
                ('Vanya','as2@gmail.com','+380501234568','/asd/photo.jpeg',2),
                ('Petya','as3@gmail.com','+380501234569','/asd/photo.jpeg',3),
                ('Vanya','as4@gmail.com','+380501234510','/asd/photo.jpeg',2),
                ('Kolya','as5@gmail.com','+380501234511','/asd/photo.jpeg',3),
                ('Vanya','as6@gmail.com','+380501234512','/asd/photo.jpeg',1),
                ('Vanya','as7@gmail.com','+380501234513','/asd/photo.jpeg',1),
                ('Vanya','as8@gmail.com','+380501234514','/asd/photo.jpeg',1),
                ('Anya','as9@gmail.com','+380501234515','/asd/photo.jpeg',2),
                ('Vanya','as10@gmail.com','+380501234516','/asd/photo.jpeg',2),
                ('Sanya','as12@gmail.com','+380501234517','/asd/photo.jpeg',1),
                ('Vanya','a11@gmail.com','+380501234518','/asd/photo.jpeg',2),
                ('Fedor','a13@gmail.com','+380501234519','/asd/photo.jpeg',1),
                ('Vanya','a14@gmail.com','+380501234520','/asd/photo.jpeg',2),
                ('Vanya','a15@gmail.com','+380501234521','/asd/photo.jpeg',2),
                ('Anatoliy','a16@gmail.com','+380501234522','/asd/photo.jpeg',2),
                ('Vanya','a17@gmail.com','+380501234523','/asd/photo.jpeg',2),
                ('Kolya','a18@gmail.com','+380501234524','/asd/photo.jpeg',2),
                ('Vanya','a19@gmail.com','+380501234525','/asd/photo.jpeg',2),
                ('Anatoliy','a20@gmail.com','+380501234526','/asd/photo.jpeg',2),
                ('Vanya','a21@gmail.com','+380501234527','/asd/photo.jpeg',2),
                ('Vanya','a22@gmail.com','+380501234528','/asd/photo.jpeg',2),
                ('Anatoliy','a23@gmail.com','+380501234529','/asd/photo.jpeg',2),
                ('Vanya','a24@gmail.com','+380501234530','/asd/photo.jpeg',2),
                ('Vanya','a25@gmail.com','+380501234531','/asd/photo.jpeg',2),
                ('Kolya','a26@gmail.com','+380501234532','/asd/photo.jpeg',2),
                ('Vanya','a27@gmail.com','+380501234533','/asd/photo.jpeg',2),
                ('Vanya','a28@gmail.com','+380501234534','/asd/photo.jpeg',2),
                ('Nikolay','a29@gmail.com','+380501234535','/asd/photo.jpeg',2),
                ('Vanya','a30@gmail.com','+380501234536','/asd/photo.jpeg',2),
                ('Vanya','a31@gmail.com','+380501234537','/asd/photo.jpeg',2),
                ('Anatoliy','a32@gmail.com','+380501234538','/asd/photo.jpeg',2),
                ('Vanya','a33@gmail.com','+380501234540','/asd/photo.jpeg',2),
                ('Vanya','a34@gmail.com','+380501234541','/asd/photo.jpeg',2),
                ('Vasilisa','a35@gmail.com','+380501234542','/asd/photo.jpeg',2),
                ('Vanya','a36@gmail.com','+380501234543','/asd/photo.jpeg',2),
                ('Kolya','a37@gmail.com','+380501234544','/asd/photo.jpeg',2),
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            TRUNCATE users
        `);
    }
}
