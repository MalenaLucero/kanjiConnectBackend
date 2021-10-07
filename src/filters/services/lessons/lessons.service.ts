import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Lesson } from 'src/filters/entities/lesson.entity';
import { CreateLessonDto, UpdateLessonDto } from 'src/filters/dtos/lesson.dto';

@Injectable()
export class LessonsService {
    constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson>) {}

    findAll() {
        return this.lessonModel.find().exec();
    }

    async findOne(id: string) {
        const lesson = await this.lessonModel.findById(id).exec();
        if (!lesson) {
            throw new NotFoundException('Lesson with ID ' + id + ' not found');
        }
        return lesson;
    }

    async findByUser(id: string) {
        const lessons = await this.lessonModel.find({ user: id }).exec();
        if (!lessons) {
            throw new NotFoundException('Lessons for user with ID ' + id + ' not found');
        }
        return lessons;
    }

    create(data: CreateLessonDto) {
        const newLesson = new this.lessonModel(data);
        return newLesson.save();
    }

    update(id: string, changes: UpdateLessonDto) {
        const lesson = this.lessonModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
        if (!lesson) {
            throw new NotFoundException(id);
        }
        return lesson;
    }

    delete(id: string) {
        return this.lessonModel.findByIdAndDelete(id);
    }


    /*async findByFilter(id: string) {
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
    }*/
}
