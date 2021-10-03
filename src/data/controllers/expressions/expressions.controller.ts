import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ExpressionsService } from 'src/data/services/expressions/expressions.service';
import { CreateExpressionDto, FilterExpressionsDto, UpdateExpressionDto } from 'src/data/dtos/expression.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { KanjisService } from 'src/data/services/kanjis/kanjis.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('expressions')
@Controller('expressions')
export class ExpressionsController {
    constructor(private expressionsService: ExpressionsService,
                private kanjisService: KanjisService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Public()
    @Get()
    getExpressions(@Query() params: FilterExpressionsDto) {
        return this.expressionsService.findAll(params);
    }

    @Public()
    @Get(':id')
    getExpression(@Param('id', MongoIdPipe) id: string) {
        return this.expressionsService.findOne(id);
    }

    @Public()
    @Get('user/:id')
    getExpressionsByUser(@Param('id', MongoIdPipe) id: string) {
        return this.expressionsService.findByUser(id);
    }

    @Public()
    @Post('user/:id')
    filterExpressions(@Param('id', MongoIdPipe) id: string, @Body() payload: FilterExpressionsDto) {
        return this.expressionsService.filter(id, payload);
    }

    @Roles(Role.ADMIN)
    //@Public()
    @Post()
    async create(@Body() payload: CreateExpressionDto) {
        const kanjisIds: Array<string> = await this.kanjisService.createFromWord(payload.word);
        payload.kanjis = kanjisIds;
        return this.expressionsService.create(payload);
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateExpressionDto) {
        return this.expressionsService.update(id, payload);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.expressionsService.delete(id);
    }
}
