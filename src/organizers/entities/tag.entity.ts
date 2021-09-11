import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tag extends Document {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String})
    type: string;

    @Prop(raw({
        name: { type: String },
        image: { type: String }
    }))
    category: Record<string, any> 
}

export const TagSchema = SchemaFactory.createForClass(Tag);