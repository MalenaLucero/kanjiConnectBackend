import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ExampleSentence extends Document {
    @Prop({ type: String, required: true })
    sentence: string;

    @Prop({ type: String})
    source: string;

    @Prop({ type: String})
    link: string;
}

export const ExampleSentenceSchema = SchemaFactory.createForClass(ExampleSentence);