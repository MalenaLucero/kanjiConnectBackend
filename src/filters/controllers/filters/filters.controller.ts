import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';

import { FiltersService } from 'src/filters/services/filters/filters.service';
import { CreateFilterDto, UpdateFilterDto } from 'src/filters/dtos/filter.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@Controller('filters')
export class FiltersController {
    constructor(private filtersService: FiltersService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Get()
    getFilters() {
        return this.filtersService.findAll();
    }

    @Get(':id')
    getFilter(@Param('id', MongoIdPipe) id: string) {
        return this.filtersService.findOne(id);
    }

    @Get('user/:id')
    getFilterByUser(@Param('id', MongoIdPipe) id: string) {
        return this.filtersService.findOneByUser(id);
    }

    @Post()
    create(@Body() payload: CreateFilterDto) {
        return this.filtersService.create(payload);
    }

    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.filtersService.delete(id);
    }
}
