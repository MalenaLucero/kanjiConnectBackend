import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { OrderedBulkOperation } from 'mongodb';
import { Tag } from 'src/users/entities/tag.entity';
import { CreateTagDto, UpdateTagDto } from 'src/users/dtos/tag.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    findAll() {
        return this.userModel.find().exec();
    }

    async findOne(id: string) {
        const tag = await this.userModel.findById(id).exec();
        if (!tag) {
            throw new NotFoundException('Tag with id ' + id + ' not found');
        }
        return tag;
    }

    create(data: CreateUserDto) {
        const newTag = new this.userModel(data);
        return newTag.save();
    }

    update(id: string, changes: UpdateUserDto) {
        const tag = this.userModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
        if (!tag) {
            throw new NotFoundException(id);
        }
        return tag;
    }

    delete(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }

    async removeTag(id: string, tagId: string) {
        const user = await this.userModel.findById(id);
        user.tags.pull(tagId);
        return user.save();
    }

    async addTag(id: string, tag: CreateTagDto) {
        const user = await this.userModel.findById(id);
        user.tags.push(tag);
        return user.save();
    }

    async updateTag(id: string, tagId: string, changes: UpdateTagDto) {
        const user = this.userModel.findByIdAndUpdate(
            id,
            { $set: { "tags.$[elem]": changes }},
            { arrayFilters: [{ "elem._id": tagId }]}
        ).exec();
        return user;
    }
}
