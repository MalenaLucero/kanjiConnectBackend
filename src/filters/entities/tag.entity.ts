import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/entities/user.entity'
@Schema()
export class Tag extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user:  User | Types.ObjectId;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String})
    description: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);