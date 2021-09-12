import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LessonsService } from 'src/filters/services/lessons/lessons.service';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { CreateLessonDto, UpdateLessonDto, FilterLessonDto } from 'src/filters/dtos/lesson.dto';

@Controller('filters/lessons')
export class LessonsController {
    constructor(private lessonsService: LessonsService) {}

    @Get('search')
    getLessonsByFilterOrUser(@Query() params: FilterLessonDto) {
        if (params.filter) {
            return this.lessonsService.findByFilter(params.filter)
        } else if (params.user) {
            return this.lessonsService.findByUser(params.user)
        }
    }

    @Put(':id')
    addLesson(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: CreateLessonDto
    ) {
        return this.lessonsService.addLesson(id, payload);
    }

    @Delete(':id/:lessonId')
    deleteLesson(
        @Param('id', MongoIdPipe) id: string, 
        @Param('lessonId', MongoIdPipe) lessonId: string) {
        return this.lessonsService.removeLesson(id, lessonId);
    }
}
