import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExpressionsController } from './controllers/expressions/expressions.controller';
import { ExpressionsService } from './services/expressions/expressions.service';
import { Expression, ExpressionSchema } from './entities/expression.entity';
import { KanjisController } from './controllers/kanjis/kanjis.controller';
import { KanjisService } from './services/kanjis/kanjis.service';
import { Kanji, KanjiSchema } from './entities/kanji.entity';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Kanji.name,
            schema: KanjiSchema
        }, {
            name: Expression.name,
            schema: ExpressionSchema
        }
    ])],
    controllers: [ExpressionsController, KanjisController],
    providers: [ExpressionsService, KanjisService]
})
export class DataModule {}
