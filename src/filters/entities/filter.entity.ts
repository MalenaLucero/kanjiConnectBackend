import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/entities/user.entity'
import { TagSchema } from './tag.entity';
import { LessonSchema } from './lesson.entity';

@Schema()
export class Filter extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user:  User | Types.ObjectId;

    @Prop({ type: [TagSchema] })
    tags: Types.Array<Record<string, any>>

    @Prop({ type: [LessonSchema] })
    lessons: Types.Array<Record<string, any>>
}

export const FilterSchema = SchemaFactory.createForClass(Filter);