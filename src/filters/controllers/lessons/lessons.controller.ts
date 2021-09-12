import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LessonsService } from 'src/filters/services/lessons/lessons.service';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { CreateLessonDto, UpdateLessonDto } from 'src/filters/dtos/lesson.dto';

@Controller('filters')
export class LessonsController {
    constructor(private lessonsService: LessonsService) {}

    @Delete(':id/lessons/:lessonId')
    deleteLesson(
        @Param('id', MongoIdPipe) id: string, 
        @Param('lessonId', MongoIdPipe) lessonId: string) {
        return this.lessonsService.removeLesson(id, lessonId);
    }

    @Put(':id/lessons')
    addLesson(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: CreateLessonDto
    ) {
        return this.lessonsService.addLesson(id, payload);
    }
}
