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
@Controller('filters/tags')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @Public()
    @HttpCode(HttpStatus.ACCEPTED)
    @Get('search')
    getTagsByFilterOrUser(@Query() params: FilterTagDto) {
        if (params.filter) {
            return this.tagsService.findByFilter(params.filter);
        } else if (params.user) {
            return this.tagsService.findByUser(params.user);
        } 
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    addTag(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: CreateTagDto
    ) {
        return this.tagsService.addTag(id, payload);
    }

    @Roles(Role.ADMIN)
    @Delete(':id/:tagId')
    deleteTag(
        @Param('id', MongoIdPipe) id: string, 
        @Param('tagId', MongoIdPipe) tagId: string) {
        return this.tagsService.removeTag(id, tagId);
    }
}
