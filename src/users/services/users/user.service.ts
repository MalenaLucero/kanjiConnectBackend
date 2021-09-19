import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

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

    async create(data: CreateUserDto) {
        const newModel = new this.userModel(data);
        const hashPassword = await bcrypt.hash(newModel.password, 10);
        newModel.password = hashPassword;
        const model = await newModel.save();
        const { password, ...rta } = model.toJSON();
        return rta;
    }

    findByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
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
