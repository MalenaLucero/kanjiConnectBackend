import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpCode, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LessonsService } from 'src/filters/services/lessons/lessons.service';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { CreateLessonDto, UpdateLessonDto, FilterLessonDto } from 'src/filters/dtos/lesson.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
    constructor(private lessonsService: LessonsService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Roles(Role.ADMIN)
    @Get()
    getLessons() {
        return this.lessonsService.findAll();
    }

    @Public()
    @Get(':id')
    getLesson(@Param('id', MongoIdPipe) id: string) {
        return this.lessonsService.findOne(id);
    }

    @Public()
    @Get('user/:id')
    getLessonsByUser(@Param('id', MongoIdPipe) id: string) {
        return this.lessonsService.findByUser(id);
    }

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() payload: CreateLessonDto) {
        return this.lessonsService.create(payload);
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateLessonDto) {
        return this.lessonsService.update(id, payload);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.lessonsService.delete(id);
    }
}
