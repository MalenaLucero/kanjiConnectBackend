import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/entities/user.entity'
import { SourceSchema } from './source.entity';
@Schema()
export class Lesson extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user:  User | Types.ObjectId;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: String})
    topic: string;

    @Prop({ type: String})
    link: string;

    @Prop({ type: [SourceSchema] })
    sources: Types.Array<Record<string, any>>
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);