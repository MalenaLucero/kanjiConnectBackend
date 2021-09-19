import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';

import { KanjisService } from 'src/data/services/kanjis/kanjis.service';
import { CreateKanjiDto, UpdateKanjiDto, FilterKanjisDto } from 'src/data/dtos/kanji.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('kanjis')
export class KanjisController {
    constructor(private kanjisService: KanjisService) {}

    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.ACCEPTED)
    @Get()
    getKanjis(@Query() params: FilterKanjisDto) {
        return this.kanjisService.findAll(params);
    }

    @Public()
    @Get(':id')
    getKanji(@Param('id', MongoIdPipe) id: string) {
        return this.kanjisService.findOne(id);
    }

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() payload: CreateKanjiDto) {
        return this.kanjisService.create(payload);
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateKanjiDto) {
        const res = this.kanjisService.update(id, payload);
        return {
            message: 'Update',
            id,
            res,
        };
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.kanjisService.delete(id);
    }
}
