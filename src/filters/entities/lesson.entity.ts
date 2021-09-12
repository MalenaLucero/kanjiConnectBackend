import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Lesson extends Document {
    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: String})
    topic: string;

    @Prop({ type: String})
    link: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);