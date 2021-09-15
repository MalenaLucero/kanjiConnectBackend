import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode, UseGuards, SetMetadata } from '@nestjs/common';

import { ExpressionsService } from 'src/data/services/expressions/expressions.service';
import { CreateExpressionDto, FilterExpressionsDto, UpdateExpressionDto } from 'src/data/dtos/expression.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { KanjisService } from 'src/data/services/kanjis/kanjis.service';
import { ApiKeyGuard } from '../../../auth/guards/api-key.guard'
import { Public } from 'src/auth/decorators/public.decorator';
@UseGuards(ApiKeyGuard)
@Controller('expressions')
export class ExpressionsController {
    constructor(private expressionsService: ExpressionsService,
                private kanjisService: KanjisService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Get()
    @Public()
    getClasses(@Query() params: FilterExpressionsDto) {
        return this.expressionsService.findAll(params);
    }

    @Get(':id')
    getClass(@Param('id', MongoIdPipe) id: string) {
        return this.expressionsService.findOne(id);
    }

    @Get('user/:id')
    getExpressionsByUser(@Param('id', MongoIdPipe) id: string) {
        return this.expressionsService.findByUser(id);
    }

    @Post('user/:id')
    filterExpressions(@Body() payload: FilterExpressionsDto) {
        return this.expressionsService.filter(payload);
    }

    @Post()
    async create(@Body() payload: CreateExpressionDto) {
        const kanjisIds: Array<string> = await this.kanjisService.createFromWord(payload.word);
        payload.kanjis = kanjisIds;
        return this.expressionsService.create(payload);
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
