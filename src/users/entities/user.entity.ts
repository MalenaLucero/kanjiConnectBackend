import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ type: String, required: true })
    username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);