import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Kanji extends Document{
    @Prop({ type: String, required: true, unique: true })
    kanji: string;

    @Prop({ type: Number })
    jlpt: number;

    @Prop({ type: Number })
    grade: number;

    @Prop({ type: [String] })
    meanings: Array<string>;

    @Prop({ type: [String] })
    kun_readings: Array<string>;

    @Prop({ type: [String] })
    on_readings: Array<string>;
}

export const KanjiSchema = SchemaFactory.createForClass(Kanji);