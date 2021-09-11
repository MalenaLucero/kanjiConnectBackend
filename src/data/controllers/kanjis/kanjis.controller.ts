import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';

import { KanjisService } from 'src/data/services/kanjis/kanjis.service';
import { CreateKanjiDto, UpdateKanjiDto, FilterKanjisDto } from 'src/data/dtos/kanji.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@Controller('kanjis')
export class KanjisController {
    constructor(private kanjisService: KanjisService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Get()
    getKanjis(@Query() params: FilterKanjisDto) {
        return this.kanjisService.findAll(params);
    }

    @Get(':id')
    getKanji(@Param('id', MongoIdPipe) id: string) {
        return this.kanjisService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateKanjiDto) {
        return this.kanjisService.create(payload);
    }

    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateKanjiDto) {
        const res = this.kanjisService.update(id, payload);
        return {
            message: 'Update',
            id,
            res,
        };
    }

    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.kanjisService.delete(id);
    }
}
