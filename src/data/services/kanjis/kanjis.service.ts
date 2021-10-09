import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';

import { Kanji } from 'src/data/entities/kanji.entity';
import { CreateKanjiDto, UpdateKanjiDto, FilterKanjisDto } from '../../dtos/kanji.dto';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';

@Injectable()
export class KanjisService {
    constructor(@InjectModel(Kanji.name) private kanjiModel: Model<Kanji>,
                private httpService: HttpService) {}

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

    async findOneByCharacter(character: string) {
        const kanji = await this.kanjiModel.findOne({ kanji: character }).exec();
        if (!kanji) {
            throw new NotFoundException('Kanji ' + character + ' not found');
        }
        return kanji;
    }

    async filter(data: FilterKanjisDto) {
        const query = {}
        if (data.hasOwnProperty('kanji')) {
            query['kanji'] = data.kanji;
        }
        if (data.hasOwnProperty('jlpt')) {
            query['jlpt'] = data.jlpt;
        }
        const kanji = await this.kanjiModel.find(query).exec();
        if (!kanji) {
            throw new NotFoundException('Kanji ' + data.kanji + ' not found');
        }
        return kanji;
    }

    findMany(kanjis: Array<string>) {
        return this.kanjiModel.find({
            'kanji': { $in: kanjis }
        }).exec();
    }

    create(data: CreateKanjiDto) {
        const newKanji = new this.kanjiModel(data);
        return newKanji.save();
    }

    async createFromWord(word: string): Promise<string[]> {
        const kanjis: Array<string> = this.getKanjisFromWord(word);
        const kanjisInDatabase = await this.findMany(kanjis);
        const kanjisToUpload = kanjis.filter(kanji => !kanjisInDatabase.map(e => e.kanji).includes(kanji));
        const newKanjis = kanjisToUpload.length > 0 ? await this.createMany(kanjisToUpload) : [];
        return [ ...kanjisInDatabase, ...newKanjis ].map(e => e._id);
    }

    async createMany(kanjis: Array<string>) {
        const newKanjis = await firstValueFrom(this.getKanjiArrayFromExternalApi(kanjis));
        return this.kanjiModel.create(newKanjis);
    }

    getKanjiArrayFromExternalApi(kanjis: Array<string>): Observable<Array<CreateKanjiDto>> {
        return forkJoin(
                kanjis.map(kanji => this.getKanjiDataFromExternalApi(kanji))
        ).pipe(
            map((data: any) => {
                return kanjis.map((kanji, index) => {
                    const kanjiData = { ...data[index].data };
                    delete kanjiData.stroke_count;
                    delete kanjiData.name_readings;
                    delete kanjiData.unicode;
                    delete kanjiData.heisig_en;
                    return kanjiData;
                });
            })
        );
    }

    getKanjiDataFromExternalApi(kanji: string): Observable<any> {
        const URI = 'https://kanjiapi.dev/v1/kanji/' + kanji;
        const encodedURI = encodeURI(URI);
        return this.httpService.get(encodedURI);
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

    getKanjisFromWord(word: string): Array<string> {
        const kanjiArray = word.split('')
            .filter(char => char.charCodeAt(0) >= 13312 && char.charCodeAt(0) < 65306);
        const kanjiSet = new Set(kanjiArray)
        return Array.from(kanjiSet);
    }
}
