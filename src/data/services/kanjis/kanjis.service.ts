import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Kanji } from 'src/data/entities/kanji.entity';
import { CreateKanjiDto, UpdateKanjiDto, FilterKanjisDto } from '../../dtos/kanji.dto';

@Injectable()
export class KanjisService {
    constructor(@InjectModel(Kanji.name) private kanjiModel: Model<Kanji>) {}

    findAll(params?: FilterKanjisDto) {
        if(params) {
            const filters: FilterQuery<Kanji> = {}
            const { limit, offset } = params;
            return this.kanjiModel.find().skip(offset).limit(limit).exec();
        }
        return this.kanjiModel.find().exec();
    }

    async findOne(id: string) {
        const kanji = await this.kanjiModel.findById(id).exec();
        if (!kanji) {
            throw new NotFoundException('Kanji with id ' + id + ' not found');
        }
        return kanji;
    }

    create(data: CreateKanjiDto) {
        const newKanji = new this.kanjiModel(data);
        return newKanji.save();
    }

    update(id: string, changes: UpdateKanjiDto) {
        const kanji = this.kanjiModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
        if (!kanji) {
            throw new NotFoundException(id);
        }
        return kanji;
    }

    delete(id: string) {
        return this.kanjiModel.findByIdAndDelete(id);
    }
}
