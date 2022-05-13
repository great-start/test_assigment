import { Column, CreateDateColumn, Entity } from 'typeorm';

import { CommonFields, ICommonFields } from './CommonFields';

export interface IUser extends ICommonFields {
    name: string,
    email: string,
    phone: string,
    position_id: number,
    photo: string,
    registration_timestamp: string
}

@Entity()
export class Users extends CommonFields implements IUser {
    @Column('varchar', {
        length: 100,
    })
        name: string;

    @Column('varchar')
        email: string;

    @Column('varchar')
        phone: string;

    @Column('int')
        position_id: number;

    @Column('varchar')
        photo: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
    })
        registration_timestamp: string;
}
