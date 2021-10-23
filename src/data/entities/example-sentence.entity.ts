import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Source } from 'src/filters/entities/source.entity';

@Schema()
export class ExampleSentence extends Document {
    @Prop({ type: String, required: true })
    sentence: string;

    @Prop({ type: Types.ObjectId, ref: Source.name, required: true })
    source:  Source | Types.ObjectId;
}

export const ExampleSentenceSchema = SchemaFactory.createForClass(ExampleSentence);