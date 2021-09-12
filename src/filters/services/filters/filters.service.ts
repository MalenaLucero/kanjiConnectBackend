import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Filter } from 'src/filters/entities/filter.entity';
import { CreateFilterDto, UpdateFilterDto } from 'src/filters/dtos/filter.dto';

@Injectable()
export class FiltersService {
    constructor(@InjectModel(Filter.name) private filterModel: Model<Filter>) {}

    findAll() {
        return this.filterModel.find().exec();
    }

    async findOne(id: string) {
        const filter = await this.filterModel.findById(id).exec();
        if (!filter) {
            throw new NotFoundException('Filter with id ' + id + ' not found');
        }
        return filter;
    }

    async findOneByUser(id: string) {
        const filter = await this.filterModel.findOne({ user: id }).exec();
        if (!filter) {
            throw new NotFoundException('Filter with user ' + id + ' not found');
        }
        return filter;
    }

    create(data: CreateFilterDto) {
        const newFilter = new this.filterModel(data);
        return newFilter.save();
    }

    delete(id: string) {
        return this.filterModel.findByIdAndDelete(id);
    }
}
