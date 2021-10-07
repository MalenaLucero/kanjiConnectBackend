import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpCode, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TagsService } from 'src/filters/services/tags/tags.service';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { CreateTagDto, UpdateTagDto, FilterTagDto } from 'src/filters/dtos/tag.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('tags')
@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Roles(Role.ADMIN)
    @Get()
    getTags() {
        return this.tagsService.findAll();
    }

    @Public()
    @Get(':id')
    getTag(@Param('id', MongoIdPipe) id: string) {
        return this.tagsService.findOne(id);
    }

    @Public()
    @Get('user/:id')
    getTagsByUser(@Param('id', MongoIdPipe) id: string) {
        return this.tagsService.findByUser(id);
    }

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() payload: CreateTagDto) {
        return this.tagsService.create(payload);
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateTagDto) {
        return this.tagsService.update(id, payload);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.tagsService.delete(id);
    }
}
