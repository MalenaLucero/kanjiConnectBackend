import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TagsService } from 'src/filters/services/tags/tags.service';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { CreateTagDto, UpdateTagDto, FilterTagDto } from 'src/filters/dtos/tag.dto';

@Controller('filters/tags')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Get('search')
    getTagsByFilterOrUser(@Query() params: FilterTagDto) {
        if (params.filter) {
            return this.tagsService.findByFilter(params.filter);
        } else if (params.user) {
            return this.tagsService.findByUser(params.user);
        } 
    }

    @Put(':id')
    addTag(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: CreateTagDto
    ) {
        return this.tagsService.addTag(id, payload);
    }

    @Delete(':id/:tagId')
    deleteTag(
        @Param('id', MongoIdPipe) id: string, 
        @Param('tagId', MongoIdPipe) tagId: string) {
        return this.tagsService.removeTag(id, tagId);
    }
}
