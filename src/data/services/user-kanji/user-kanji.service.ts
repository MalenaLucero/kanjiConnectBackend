import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';

import { UserKanji } from 'src/data/entities/user-kanji.entity';
import { CreateUserKanjiDto, UpdateUserKanjiDto } from 'src/data/dtos/user-kanji.dto';

@Injectable()
export class UserKanjiService {
    constructor(@InjectModel(UserKanji.name) private userKanjiModel: Model<UserKanji>,
                private httpService: HttpService) {}

    findAll() {
        return this.userKanjiModel.find().exec();
    }

    async findOne(id: string) {
        const kanji = await this.userKanjiModel.findById(id).populate('expressions').exec();
        if (!kanji) {
            throw new NotFoundException('Kanji with id ' + id + ' not found');
        }
        return kanji;
    }

    findByUser(id: string) {
        return this.userKanjiModel.find({
            'user': id
        }).exec();
    }

    create(data: CreateUserKanjiDto) {
        const newKanji = new this.userKanjiModel(data);
        return newKanji.save();
    }

    update(id: string, changes: UpdateUserKanjiDto) {
        const kanji = this.userKanjiModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
        if (!kanji) {
            throw new NotFoundException(id);
        }
        return kanji;
    }

    delete(id: string) {
        return this.userKanjiModel.findByIdAndDelete(id);
    }
}
