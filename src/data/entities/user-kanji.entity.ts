import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/entities/user.entity';
import { Kanji } from '../entities/kanji.entity';
import { Expression } from './expression.entity';

@Schema()
export class UserKanji extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user:  User | Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Kanji.name, required: true })
    kanji:  Kanji | Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: Expression.name }] })
    expressions: Types.Array<Expression>;

    @Prop({ type: Number, required: true })
    difficulty: Number
}

export const UserKanjiSchema = SchemaFactory.createForClass(UserKanji);