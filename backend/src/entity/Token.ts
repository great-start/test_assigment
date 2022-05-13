import { Column, Entity } from 'typeorm';
import { CommonFields, ICommonFields } from './CommonFields';

export interface IToken extends ICommonFields {
    accessToken: string;
}

@Entity()
export class Token extends CommonFields implements IToken {
    @Column('varchar')
        accessToken:string;
}
