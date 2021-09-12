import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Filter } from 'src/filters/entities/filter.entity';
import { CreateLessonDto } from 'src/filters/dtos/lesson.dto';

@Injectable()
export class LessonsService {
    constructor(@InjectModel(Filter.name) private filterModel: Model<Filter>) {}

    async findByFilter(id: string) {
        const filter = await this.filterModel.findById(id);
        return filter.lessons;
    }

    async findByUser(id: string) {
        const filter = await this.filterModel.findOne({ user: id });
        return filter.lessons;
    }

    async addLesson(id: string, lesson: CreateLessonDto) {
        const filter = await this.filterModel.findById(id);
        filter.lessons.push(lesson);
        return filter.save();
    }

    async removeLesson(id: string, lessonId: string) {
        const filter = await this.filterModel.findById(id);
        filter.lessons.pull(lessonId);
        return filter.save();
    }
}
