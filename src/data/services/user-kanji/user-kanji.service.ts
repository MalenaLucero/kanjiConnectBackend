import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';

import { UserKanji } from 'src/data/entities/user-kanji.entity';
import { CreateUserKanjiDto, FilterUserKanjiDto, UpdateUserKanjiDto } from 'src/data/dtos/user-kanji.dto';
import { ExpressionsService } from '../expressions/expressions.service';
import { FilterExpressionsDto } from 'src/data/dtos/expression.dto';
import { KanjisService } from '../kanjis/kanjis.service';
import { FilterKanjisDto } from 'src/data/dtos/kanji.dto';

@Injectable()
export class UserKanjiService {
    constructor(@InjectModel(UserKanji.name) private userKanjiModel: Model<UserKanji>,
                private httpService: HttpService,
                private expressionsService: ExpressionsService,
                private kanjiService: KanjisService) {}

    findAll() {
        return this.userKanjiModel.find()
            .populate('expressions', 'word')
            .populate('kanji', 'kanji')
            .populate('user', 'username').exec();
    }

    async findOne(id: string) {
        const kanji = await this.userKanjiModel.findById(id)
            .populate('expressions', 'word')
            .populate('kanji', 'kanji')
            .populate('user', 'username').exec();
        if (!kanji) {
            throw new NotFoundException('Kanji with id ' + id + ' not found');
        }
        return kanji;
    }

    findByUser(id: string) {
        return this.userKanjiModel.find({
            'user': id
        })
            .populate('expressions', 'word')
            .populate('kanji', 'kanji')
            .populate('user', 'username').exec();
    }

    findByUserAndKanji(id: string, kanjiId: string) {
        return this.userKanjiModel.findOne({
            'user': id,
            'kanji': kanjiId
        })
            .populate('expressions', 'word')
            .populate('kanji', 'kanji')
            .populate('user', 'username').exec();
    }

    async filter(data: FilterUserKanjiDto) {
        const query = { user: data.user }
        if (data.hasOwnProperty('kanjiAsCharacter')) {
            const kanji = await this.kanjiService.findOneByCharacter(data.kanjiAsCharacter);
            query['kanji'] = kanji._id;
        } else {
            if (data.hasOwnProperty('difficulty')) {
                query['difficulty'] = data.difficulty; 
            }
            if (data.hasOwnProperty('lesson') || data.hasOwnProperty('tags')) {
                const expressionsId = await this.filterByExpressionsProperty(data)
                query['expressions'] = { $in: expressionsId };
            }
            if (data.hasOwnProperty('jlpt')) {
                const kanjisId = await this.filterByKanjisProperty(data);
                query['kanji'] = { $in: kanjisId };
            }
        }
        
        return this.userKanjiModel.find(query)
            .populate('kanji')
            .populate('expressions').exec();
    }

    async filterByExpressionsProperty(data: FilterUserKanjiDto) {
        const filterExpressions = new FilterExpressionsDto();
        filterExpressions.user = data.user;
        if (data.hasOwnProperty('lesson')) {
            filterExpressions.lesson = data.lesson;
        }
        if (data.hasOwnProperty('tags')) {
            filterExpressions.tags = data.tags;
        }
        const expressions = await this.expressionsService.filter(filterExpressions);
        return expressions.map(e => e._id);
    }

    async filterByKanjisProperty(data: FilterUserKanjiDto) {
        const filterKanjis = new FilterKanjisDto();
        filterKanjis.jlpt = data.jlpt;
        const kanjis = await this.kanjiService.filter(filterKanjis);
        return kanjis.map(e => e._id);
    }

    create(data: CreateUserKanjiDto) {
        const newKanji = new this.userKanjiModel(data);
        return newKanji.save();
    }

    async createFromWord(kanjisIds: Array<string>, expressionId: string, userId: string) {
        for(let i = 0; i < kanjisIds.length; i++) {
            const userKanji = await this.findByUserAndKanji(userId, kanjisIds[i]);
            if(userKanji) {
                await this.addExpressionId(userKanji._id, expressionId);
            } else {
                const newUserKanji: CreateUserKanjiDto = {
                    user: userId,
                    kanji: kanjisIds[i],
                    expressions: [expressionId],
                    difficulty: 5,
                    created: new Date(),
                    updated: new Date()
                }
                await this.create(newUserKanji);
            }
        }
    }

    update(id: string, changes: UpdateUserKanjiDto) {
        const kanji = this.userKanjiModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
        if (!kanji) {
            throw new NotFoundException(id);
        }
        return kanji;
    }

    addExpressionId(userKanjiId: string, expressionId: string) {
        const kanji = this.userKanjiModel.findByIdAndUpdate(
            userKanjiId, 
            { $push: { expressions: expressionId } }, 
            { new: true }).exec();
        if (!kanji) {
            throw new NotFoundException(userKanjiId);
        }
        return kanji;
    }

    delete(id: string) {
        return this.userKanjiModel.findByIdAndDelete(id);
    }
}
