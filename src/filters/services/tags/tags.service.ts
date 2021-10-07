import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Tag } from 'src/filters/entities/tag.entity';
import { CreateTagDto, UpdateTagDto } from 'src/filters/dtos/tag.dto';

@Injectable()
export class TagsService {
    constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

    findAll() {
        return this.tagModel.find().exec();
    }

    async findOne(id: string) {
        const tag = await this.tagModel.findById(id).exec();
        if (!tag) {
            throw new NotFoundException('Tag with ID ' + id + ' not found');
        }
        return tag;
    }

    async findByUser(id: string) {
        const tag = await this.tagModel.find({ user: id }).exec();
        if (!tag) {
            throw new NotFoundException('Tags for user with ID ' + id + ' not found');
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

    /*async findByFilter(id: string) {
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

    @Put(':id/tags/:tagId')
    updateTag(
        @Param('id', MongoIdPipe) id: string,
        @Param('tagId', MongoIdPipe) tagId: string,
        @Body() payload: UpdateTagDto
    ) {
        return this.usersService.updateTag(id, tagId, payload);
    }*/
}
