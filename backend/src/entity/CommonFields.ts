import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ICommonFields {
    id: number
}

@Entity()
export class CommonFields implements ICommonFields {
    @PrimaryGeneratedColumn()
        id: number;
}
