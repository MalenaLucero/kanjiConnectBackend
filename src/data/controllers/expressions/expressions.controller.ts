import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';

import { ExpressionsService } from 'src/data/services/expressions/expressions.service';
import { CreateExpressionDto, FilterExpressionsDto, UpdateExpressionDto } from 'src/data/dtos/expression.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { KanjisService } from 'src/data/services/kanjis/kanjis.service';

@Controller('expressions')
export class ExpressionsController {
    constructor(private expressionsService: ExpressionsService,
                private kanjisService: KanjisService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Get()
    getClasses(@Query() params: FilterExpressionsDto) {
        return this.expressionsService.findAll(params);
    }

    @Get(':id')
    getClass(@Param('id', MongoIdPipe) id: string) {
        return this.expressionsService.findOne(id);
    }

    @Post()
    async create(@Body() payload: CreateExpressionDto) {
        const kanjis: Array<string> = payload.word.split('')
            .filter(char => char.charCodeAt(0) >= 13312 && char.charCodeAt(0) < 65306);
        const kanjisInDatabase = await this.kanjisService.findMany(kanjis);
        const kanjisToSearch = kanjis.filter(kanji => !kanjisInDatabase.map(e => e.kanji).includes(kanji));
        const newKanji = await this.kanjisService.createMany(kanjisToSearch);
        return newKanji;
        //return this.expressionsService.create(payload);
    }

    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateExpressionDto) {
        return this.expressionsService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.expressionsService.delete(id);
    }
}
