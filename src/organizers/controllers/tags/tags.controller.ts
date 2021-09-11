import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { TagsService } from '../../services/tags/tags.service';
import { CreateTagDto, UpdateTagDto, FilterTagsDto } from 'src/organizers/dtos/tag.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@ApiTags('tags')
@Controller('tags')
export class TagsController {

    constructor(private tagsService: TagsService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Get()
    @ApiOperation({summary: 'get tags'})
    getTags(
        @Query() params: FilterTagsDto
    ) {
        return this.tagsService.findAll(params);
    }

    @Get(':id')
    getTag(@Param('id', MongoIdPipe) id: string) {
        return this.tagsService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateTagDto) {
        return this.tagsService.create(payload);
    }

    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateTagDto) {
        return this.tagsService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.tagsService.delete(id);
    }
}
