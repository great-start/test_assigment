import {
    Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

interface IPositions {
    id: string;
    name: string
}

@Entity('positions')
export class Positions implements IPositions {
    @PrimaryGeneratedColumn()
        id: string;

    @Column()
        name: string;
}
