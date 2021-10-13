import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { jlptLevels } from './../../common/jlpt-levels';
import { gradeLevels } from './../../common/grade-levels';
@Schema()
export class Kanji extends Document{
    @Prop({ type: String, required: true, unique: true })
    kanji: string;

    @Prop({ type: Number, enum: jlptLevels.range, default: jlptLevels.default })
    jlpt: number;

    @Prop({ type: Number, enum: gradeLevels.range, default: gradeLevels.default })
    grade: number;

    @Prop({ type: [String] })
    meanings: Array<string>;

    @Prop({ type: [String] })
    kun_readings: Array<string>;

    @Prop({ type: [String] })
    on_readings: Array<string>;
}

export const KanjiSchema = SchemaFactory.createForClass(Kanji);