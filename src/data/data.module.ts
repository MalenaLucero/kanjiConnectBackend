import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { ExpressionsController } from './controllers/expressions/expressions.controller';
import { ExpressionsService } from './services/expressions/expressions.service';
import { Expression, ExpressionSchema } from './entities/expression.entity';
import { KanjisController } from './controllers/kanjis/kanjis.controller';
import { KanjisService } from './services/kanjis/kanjis.service';
import { Kanji, KanjiSchema } from './entities/kanji.entity';
import { ExampleSentencesController } from './controllers/example-sentences/example-sentences.controller';
import { ExampleSentencesService } from './services/example-sentences/example-sentences.service';
import { UserKanjiController } from './controllers/user-kanji/user-kanji.controller';
import { UserKanjiService } from './services/user-kanji/user-kanji.service';
import { UserKanji, UserKanjiSchema } from './entities/user-kanji.entity';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Kanji.name,
            schema: KanjiSchema
        }, {
            name: Expression.name,
            schema: ExpressionSchema
        }, {
            name: UserKanji.name,
            schema: UserKanjiSchema
        }
    ]), HttpModule],
    controllers: [ExpressionsController, KanjisController, ExampleSentencesController, UserKanjiController],
    providers: [ExpressionsService, KanjisService, ExampleSentencesService, UserKanjiService],
    exports: [ExpressionsService]
})
export class DataModule {}
