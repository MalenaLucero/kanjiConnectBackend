import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Tag } from 'src/organizers/entities/tag.entity';
import { CreateTagDto, UpdateTagDto, FilterTagsDto } from '../../dtos/tag.dto';

@Injectable()
export class TagsService {

    constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

    findAll(params?: FilterTagsDto) {
        if(params) {
            const filters: FilterQuery<Tag> = {}
            const { limit, offset } = params;
            const { minPrice, maxPrice } = params;
            if (minPrice && maxPrice) {
                filters.price = { $gte: minPrice, $lte: maxPrice }
            }
            return this.tagModel.find().skip(offset).limit(limit).exec();
        }
        return this.tagModel.find().exec();
    }

    async findOne(id: string) {
        const tag = await this.tagModel.findById(id).exec();
        if (!tag) {
            throw new NotFoundException('Tag with id ' + id + ' not found');
        }
        return tag;
    }

    create(data: CreateTagDto) {
        const newTag = new this.tagModel(data);
        return newTag.save();
    }

    update(id: string, changes: UpdateTagDto) {
        const tag = this.tagModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
        if (!tag) {
            throw new NotFoundException(id);
        }
        return tag;
    }

    delete(id: string) {
        return this.tagModel.findByIdAndDelete(id);
    }
}
