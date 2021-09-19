import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);