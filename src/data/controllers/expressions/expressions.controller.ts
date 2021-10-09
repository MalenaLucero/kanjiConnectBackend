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
import { UserKanjiService } from 'src/data/services/user-kanji/user-kanji.service';
import { CreateUserKanjiDto, UpdateUserKanjiDto } from 'src/data/dtos/user-kanji.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('expressions')
@Controller('expressions')
export class ExpressionsController {
    constructor(private expressionsService: ExpressionsService,
                private kanjisService: KanjisService,
                private userKanjiService: UserKanjiService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Public()
    @Get()
    getExpressions() {
        return this.expressionsService.findAll();
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
    @Post('filter')
    filterExpressions(@Body() payload: FilterExpressionsDto) {
        return this.expressionsService.filter(payload);
    }

    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() payload: CreateExpressionDto) {
        const kanjisIds: Array<string> = await this.kanjisService.createFromWord(payload.word);
        payload.kanjis = kanjisIds;
        const expression = await this.expressionsService.create(payload);
        await this.userKanjiService.createFromWord(kanjisIds, expression._id, payload.user);
        return expression;
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
