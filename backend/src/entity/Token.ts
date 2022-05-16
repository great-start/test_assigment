import { Column, CreateDateColumn, Entity } from 'typeorm';

import { CommonField, ICommonField } from './CommonField';

export interface IToken extends ICommonField {
    accessToken: string;
    registration_timestamp: string
}

@Entity('token')
export class Token extends CommonField implements IToken {
    @Column('varchar')
        accessToken:string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
    })
        registration_timestamp: string;
}
