import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/entities/user.entity';
import { Kanji } from '../entities/kanji.entity';
import { Tag } from '../../filters/entities/tag.entity';
import { ExampleSentenceSchema } from './example-sentence.entity';
import { Lesson } from 'src/filters/entities/lesson.entity';
import { jlptLevels } from 'src/common/jlpt-levels';
import { difficultyLevels } from 'src/common/difficulty-levels';

@Schema()
export class Expression extends Document {
    @Prop({ type: String, required: true })
    word: string;

    @Prop({ type: String })
    reading: string;

    @Prop({ type: [String] })
    englishMeaning: Array<string>;

    @Prop({ type: [String] })
    japaneseMeaning: Array<string>;

    @Prop({ type: [ExampleSentenceSchema] })
    exampleSentences: Types.Array<Record<string, any>>

    @Prop({ type: Number, enum: jlptLevels.range, default: jlptLevels.default })
    jlpt: number;

    @Prop({ type: String, enum: ['transitive', 'intransitive', null], default: null })
    transitivity: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: Tag.name }] })
    tags: Types.Array<Tag>;

    @Prop({ type: Types.ObjectId, ref: Lesson.name })
    lesson:  Lesson | Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user:  User | Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: Kanji.name }]})
    kanjis: Types.Array<Kanji>

    @Prop({ type: Number, enum: difficultyLevels.range, default: difficultyLevels.default })
    difficulty: Number

    @Prop({ type: Date, required: true })
    created: Date

    @Prop({ type: Date, required: true })
    updated: Date
}

export const ExpressionSchema = SchemaFactory.createForClass(Expression);
