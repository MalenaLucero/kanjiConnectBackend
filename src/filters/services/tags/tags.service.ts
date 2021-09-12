import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Filter } from 'src/filters/entities/filter.entity';
import { CreateTagDto } from 'src/filters/dtos/tag.dto';

@Injectable()
export class TagsService {
    constructor(@InjectModel(Filter.name) private filterModel: Model<Filter>) {}

    async findByFilter(id: string) {
        const filter = await this.filterModel.findById(id);
        if (!filter) {
            throw new NotFoundException('Filter with ID ' + id + ' not found');
        }
        return filter.tags; 
    }

    async findByUser(id: string) {
        const filter = await this.filterModel.findOne({ user: Types.ObjectId(id) });
        if (!filter) {
            throw new NotFoundException('Filter for user with ID ' + id + ' not found');
        }
        return filter.tags;
    }

    async removeTag(id: string, tagId: string) {
        const filter = await this.filterModel.findById(id);
        filter.tags.pull(tagId);
        return filter.save();
    }

    async addTag(id: string, tag: CreateTagDto) {
        const filter = await this.filterModel.findById(id);
        filter.tags.push(tag);
        return filter.save();
    }

    /*@Put(':id/tags/:tagId')
    updateTag(
        @Param('id', MongoIdPipe) id: string,
        @Param('tagId', MongoIdPipe) tagId: string,
        @Body() payload: UpdateTagDto
    ) {
        return this.usersService.updateTag(id, tagId, payload);
    }*/
}
