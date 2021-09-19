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
@Controller('filters/lessons')
export class LessonsController {
    constructor(private lessonsService: LessonsService) {}

    @Public()
    @Get('search')
    getLessonsByFilterOrUser(@Query() params: FilterLessonDto) {
        if (params.filter) {
            return this.lessonsService.findByFilter(params.filter)
        } else if (params.user) {
            return this.lessonsService.findByUser(params.user)
        }
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    addLesson(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: CreateLessonDto
    ) {
        return this.lessonsService.addLesson(id, payload);
    }
    
    @Roles(Role.ADMIN)
    @Delete(':id/:lessonId')
    deleteLesson(
        @Param('id', MongoIdPipe) id: string, 
        @Param('lessonId', MongoIdPipe) lessonId: string) {
        return this.lessonsService.removeLesson(id, lessonId);
    }
}
