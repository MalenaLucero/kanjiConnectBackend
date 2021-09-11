import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../../services/users/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { CreateTagDto, UpdateTagDto } from 'src/users/dtos/tag.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    getTag(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }

    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
        return this.usersService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.delete(id);
    }

    @Delete(':id/tags/:tagId')
    deleteTag(
        @Param('id', MongoIdPipe) id: string, 
        @Param('tagId', MongoIdPipe) tagId: string) {
        return this.usersService.removeTag(id, tagId);
    }

    @Put(':id/tags')
    addTag(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: CreateTagDto
    ) {
        return this.usersService.addTag(id, payload);
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
