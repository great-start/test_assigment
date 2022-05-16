import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ICommonField {
    id: number
}

@Entity()
export class CommonField implements ICommonField {
    @PrimaryGeneratedColumn()
        id: number;
}
