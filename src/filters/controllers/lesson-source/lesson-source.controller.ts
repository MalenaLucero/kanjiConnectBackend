import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { CreateLessonSourceDto } from 'src/filters/dtos/lesson-source.dto';
import { LessonSourceService } from 'src/filters/services/lesson-source/lesson-source.service';
import { LessonsService } from 'src/filters/services/lessons/lessons.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('lesson-source')
@Controller('lesson-source')
export class LessonSourceController {
    constructor(private lessonSourceService: LessonSourceService, private lessonsService: LessonsService) {}

    @Public()
    @Get()
    getLessonSources() {
        return this.lessonSourceService.findAll();
    }

    @Roles(Role.ADMIN)
    @Post()
    @Public()
    async create(@Body() payload: CreateLessonSourceDto) {
        return this.lessonSourceService.create(payload);
    }
}
