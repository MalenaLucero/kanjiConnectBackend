import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/entities/user.entity'
import { Lesson } from './lesson.entity';
import { Source } from './source.entity';

@Schema()
export class LessonSource extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user:  User | Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Lesson.name, required: true })
    lesson:  Lesson | Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Source.name, required: true })
    source:  Source | Types.ObjectId;

    @Prop({ type: String, required: true})
    name: string;

    @Prop({ type: String})
    link: string;
}

export const LessonSourceSchema = SchemaFactory.createForClass(LessonSource);