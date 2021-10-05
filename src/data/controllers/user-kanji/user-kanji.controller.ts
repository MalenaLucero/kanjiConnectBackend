import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserKanjiService } from 'src/data/services/user-kanji/user-kanji.service';
import { CreateUserKanjiDto, UpdateUserKanjiDto } from 'src/data/dtos/user-kanji.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { KanjisService } from 'src/data/services/kanjis/kanjis.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('user kanji')
@Controller('user-kanji')
export class UserKanjiController {
    constructor(private userKanjiService: UserKanjiService) {}

    @Public()
    @Get()
    getKanjis() {
        return this.userKanjiService.findAll();
    }

    @Public()
    @Get(':id')
    getKanji(@Param('id', MongoIdPipe) id: string) {
        return this.userKanjiService.findOne(id);
    }

    @Public()
    @Get('user/:id')
    getKanjiByUser(@Param('id', MongoIdPipe) id: string) {
        return this.userKanjiService.findByUser(id);
    }

    @Roles(Role.ADMIN)
    //@Public()
    @Post()
    async create(@Body() payload: CreateUserKanjiDto) {
        return this.userKanjiService.create(payload);
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserKanjiDto) {
        return this.userKanjiService.update(id, payload);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.userKanjiService.delete(id);
    }
}
