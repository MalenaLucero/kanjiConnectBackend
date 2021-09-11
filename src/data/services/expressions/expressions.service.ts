import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Expression } from 'src/data/entities/expression.entity';
import { CreateExpressionDto, UpdateExpressionDto, FilterExpressionsDto } from 'src/data/dtos/expression.dto';

@Injectable()
export class ExpressionsService {
    constructor(@InjectModel(Expression.name) private expressionModel: Model<Expression>) {}

    findAll(params?: FilterExpressionsDto) {
        if(params) {
            const filters: FilterQuery<Expression> = {}
            const { limit, offset } = params;
            return this.expressionModel.find().populate('kanjis').skip(offset).limit(limit).exec();
        }
        return this.expressionModel.find().populate('kanjis').exec();
    }

    async findOne(id: string) {
        const expression = await this.expressionModel.findById(id).exec();
        if (!expression) {
            throw new NotFoundException('Expression with id ' + id + ' not found');
        }
        return expression;
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
}
