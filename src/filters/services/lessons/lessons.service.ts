import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery, Callback, Document, Error, LeanDocument, NativeError, Query, QueryOptions, SaveOptions, ToObjectOptions, UpdateQuery, UpdateWithAggregationPipeline, _AllowStringsForIds, pathsToSkip } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Lesson } from 'src/filters/entities/lesson.entity';
import { CreateLessonDto, UpdateLessonDto } from 'src/filters/dtos/lesson.dto';
import { CreateSourceDto } from './../../dtos/source.dto';
import { LessonSource } from 'src/filters/entities/lesson-source.entity';
import { ClientSession, ObjectId } from 'mongodb';
import { CreateLessonSourceDto } from 'src/filters/dtos/lesson-source.dto';
import { LessonSourceService } from '../lesson-source/lesson-source.service';

@Injectable()
export class LessonsService {
    constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson>,
                private lessonSourceService: LessonSourceService) {}

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
        const lessons = await this.lessonModel.find({ user: id }).sort({date: 'ascending'}).exec();
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

    async addSource(id: string, source: CreateSourceDto) {
        const lesson = await this.lessonModel.findById(id);
        lesson.sources.push(source);
        const savedLesson = await lesson.save();
        const sourceId = savedLesson.sources.find(savedSource => savedSource.name === source.name)._id;
        const newLessonSource: CreateLessonSourceDto = {
            user: lesson.user.toString(),
            lesson: lesson._id,
            source: sourceId,
            name: source.name,
            link: source.link,
        }
        await this.lessonSourceService.create(newLessonSource);
        return savedLesson;
    }

    async deleteSource(id: string, sourceId: string) {
        const lesson = await this.lessonModel.findById(id);
        lesson.sources.pull(sourceId);
        return lesson.save();
    }
    
    /*async findByFilter(id: string) {
        const filter = await this.filterModel.findById(id);
        return filter.lessons;
    }

    async findByUser(id: string) {
        const filter = await this.filterModel.findOne({ user: id });
        return filter.lessons;
    }*/
}
