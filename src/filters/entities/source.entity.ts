import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Source extends Document {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String})
    link: string;
}

export const SourceSchema = SchemaFactory.createForClass(Source);