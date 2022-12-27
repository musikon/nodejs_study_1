import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String, required: true, unique: true })
    login: string;

    @Prop({ type: String, required: true })
    password: number;

    @Prop({ type: Number })
    age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
