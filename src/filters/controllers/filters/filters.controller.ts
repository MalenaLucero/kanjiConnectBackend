import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';

import { FiltersService } from 'src/filters/services/filters/filters.service';
import { CreateFilterDto } from 'src/filters/dtos/filter.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('filters')
export class FiltersController {
    constructor(private filtersService: FiltersService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Roles(Role.ADMIN)
    @Get()
    getFilters() {
        return this.filtersService.findAll();
    }

    @Public()
    @Get(':id')
    getFilter(@Param('id', MongoIdPipe) id: string) {
        return this.filtersService.findOne(id);
    }

    @Public()
    @Get('user/:id')
    getFilterByUser(@Param('id', MongoIdPipe) id: string) {
        return this.filtersService.findOneByUser(id);
    }

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() payload: CreateFilterDto) {
        return this.filtersService.create(payload);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.filtersService.delete(id);
    }
}
