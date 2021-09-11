import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Tag, TagSchema } from '../entities/tag.entity';

@Schema()
export class User extends Document {
    @Prop({ type: String, required: true })
    username: string;
    
    @Prop({ type: [TagSchema] })
    tags: Types.Array<Record<string, any>>
}

export const UserSchema = SchemaFactory.createForClass(User);