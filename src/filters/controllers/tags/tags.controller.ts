import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TagsService } from 'src/filters/services/tags/tags.service';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { CreateTagDto, UpdateTagDto } from 'src/filters/dtos/tag.dto';

@Controller('filters')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Get(':id/tags')
    getTagsByFilter(@Param('id', MongoIdPipe) id: string) {
        return this.tagsService.findAll(id);
    }

    @Delete(':id/tags/:tagId')
    deleteTag(
        @Param('id', MongoIdPipe) id: string, 
        @Param('tagId', MongoIdPipe) tagId: string) {
        return this.tagsService.removeTag(id, tagId);
    }

    @Put(':id/tags')
    addTag(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: CreateTagDto
    ) {
        return this.tagsService.addTag(id, payload);
    }
}
