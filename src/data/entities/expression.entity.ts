import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/entities/user.entity';
import { Kanji } from '../entities/kanji.entity';
import { ExampleSentenceSchema } from './example-sentence.entity';

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

    @Prop({ type: [String] })
    tags_id: Array<string>;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user:  User | Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: Kanji.name }]})
    kanjis: Types.Array<Kanji>
}

export const ExpressionSchema = SchemaFactory.createForClass(Expression);
