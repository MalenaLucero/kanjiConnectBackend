import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonSourceDto } from 'src/filters/dtos/lesson-source.dto';
import { LessonSource } from 'src/filters/entities/lesson-source.entity';

@Injectable()
export class LessonSourceService {
    constructor(@InjectModel(LessonSource.name) private lessonSourceModel: Model<LessonSource>) {}

    findAll() {
        return this.lessonSourceModel.find().exec();
    }

    create(data: CreateLessonSourceDto) {
        const newLesson = new this.lessonSourceModel(data);
        return newLesson.save();
    }
}
