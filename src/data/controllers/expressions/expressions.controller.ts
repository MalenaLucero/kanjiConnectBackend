import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';

import { ExpressionsService } from 'src/data/services/expressions/expressions.service';
import { CreateExpressionDto, FilterExpressionsDto, UpdateExpressionDto } from 'src/data/dtos/expression.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@Controller('expressions')
export class ExpressionsController {
    constructor(private expressionsService: ExpressionsService) {}

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
    create(@Body() payload: CreateExpressionDto) {
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
