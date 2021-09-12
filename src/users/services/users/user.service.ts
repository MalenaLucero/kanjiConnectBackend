import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { OrderedBulkOperation } from 'mongodb';

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
}
