import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface AuthModel extends Base {} //чтобы extend класс Base
export class AuthModel extends TimeStamps {

    @prop({ unique : true })
    email: string;

    @prop()
    passwordHash: string;
}

