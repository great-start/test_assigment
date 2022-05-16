import {
    Column, CreateDateColumn, Entity, ManyToOne, JoinColumn,
} from 'typeorm';

import { CommonField, ICommonField } from './CommonField';
import { Positions } from './Positions';

export interface IUser extends ICommonField {
    name: string,
    email: string,
    phone: string,
    photo: string,
    positionId: number;
    registration_timestamp: string
}

@Entity('users')
export class Users extends CommonField implements IUser {
    @Column('varchar', {
        length: 100,
    })
        name: string;

    @Column('varchar')
        email: string;

    @Column('varchar')
        phone: string;

    @Column('varchar')
        photo: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
    })
        registration_timestamp: string;

    @Column('int')
        positionId: number;

    @ManyToOne(() => Positions, (position) => position.id)
    @JoinColumn({ name: 'positionId' })
        position: Positions;
}
