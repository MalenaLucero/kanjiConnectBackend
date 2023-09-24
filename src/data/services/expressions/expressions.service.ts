import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';

import { Expression } from 'src/data/entities/expression.entity';
import { CreateExpressionDto, UpdateExpressionDto, FilterExpressionsDto } from 'src/data/dtos/expression.dto';
import { jlptJishoTextToInteger } from './../../../common/jlpt-levels';
import { Sense } from 'src/data/entities/jisho.entities';

@Injectable()
export class ExpressionsService {
    constructor(@InjectModel(Expression.name) private expressionModel: Model<Expression>,
                private httpService: HttpService) {}

    findAll() {
        /*if(params) {
            const filters: FilterQuery<Expression> = {}
            const { limit, offset } = params;
            return this.expressionModel.find().skip(offset).limit(limit).exec();
        }*/
        return this.expressionModel.find()
            .populate('kanjis', 'kanji')
            .populate('tags', 'name')
            .populate('lesson', 'topic')
            .populate('user', 'username').exec();
    }

    async findOne(id: string) {
        const expression = await this.expressionModel.findById(id)
            .populate('kanjis', 'kanji')
            .populate('tags', 'name')
            .populate('lesson', 'topic')
            .populate('user', 'username').exec();
        if (!expression) {
            throw new NotFoundException('Expression with id ' + id + ' not found');
        }
        return expression;
    }

    async findByUser(id: string) {
        const expressions = await this.expressionModel.find({ 'user': id })
            .populate('kanjis', 'kanji')
            .populate('tags', 'name')
            .populate('lesson', 'topic')
            .populate('user', 'username').exec();
        return expressions;
    }

    async findByWordAndUser(word: string, id: string) {
        const expression = await this.expressionModel.findOne({ 'word': word, 'user': id })
            .populate('kanjis', 'kanji')
            .populate('tags', 'name')
            .populate('lesson', 'topic')
            .populate('user', 'username').exec();
        if (expression === undefined) {
            throw new NotFoundException('Expressions ' + word + ' not found');
        }
        return expression;
    }

    filter(data: FilterExpressionsDto) {
        const query = { user: data.user }
        if (data.hasOwnProperty('lesson') && data.lesson !== null && data.lesson.length !== 0) {
            query['lesson'] = data.lesson;
        }
        if (data.hasOwnProperty('tags') && data.tags.length !== 0) {
            query['tags'] = { $all: data.tags };
        }
        if(data.hasOwnProperty('difficulty') && data.difficulty !== null) {
            query['difficulty'] = data.difficulty;
        }
        if (data.hasOwnProperty('kanjis') && data.kanjis.length !== 0) {
            query['kanjis'] = { $all: data.kanjis };
        }
        if (data.hasOwnProperty('source')) {
            query['exampleSentences'] = { $elemMatch: { source: data.source }};
        }
        if (data.hasOwnProperty('transitivity')) {
            query['transitivity'] = data.transitivity;
        }
        if (data.hasOwnProperty('jlpt')) {
            query['jlpt'] = data.jlpt;
        }
        return this.expressionModel.find(query)
            .populate('kanjis', 'kanji')
            .populate('tags', 'name')
            .populate('lesson', 'topic')
            .populate('user', 'username').exec();
    }

    create(data: CreateExpressionDto) {
        const newExpression = new this.expressionModel(data);
        return newExpression.save();
    }

    update(id: string, changes: UpdateExpressionDto) {
        const expression = this.expressionModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
        if (!expression) {
            throw new NotFoundException(id);
        }
        return expression;
    }

    delete(id: string) {
        return this.expressionModel.findByIdAndDelete(id);
    }

    getExpressionDataFromExternalApi(word: string) {
        const URI = 'https://jisho.org/api/v1/search/words?keyword=' + word;
        const encodedURI = encodeURI(URI);
        return this.httpService.get(encodedURI).pipe(
            map((axiosResponse: AxiosResponse) => {
                const response = axiosResponse.data.data;
                return response.map(e => {
                    let transitivity = null;
                    if (e.senses[0].parts_of_speech.includes('Intransitive verb')) {
                        transitivity = 'intransitive';
                    } else if (e.senses[0].parts_of_speech.includes('Transitive verb')) {
                        transitivity = 'transitive';
                    }
                    return {
                        word: e.japanese[0].word,
                        reading: e.japanese[0].reading,
                        englishMeaning: this.filterEnglishMeaning(e.senses),
                        jlpt: e.jlpt[0] ? jlptJishoTextToInteger(e.jlpt[0]) : null,
                        transitivity: transitivity
                    } 
                })
            }),
        );
    }

    filterEnglishMeaning(senses: Sense[]) {
        const englishMeanings: string[] =  senses.map(e => 
            e.english_definitions.join(', ').toLowerCase()
        )
        const uniqueMeanings: string [] = Array.from(new Set(englishMeanings))
        return uniqueMeanings;
    }
}
