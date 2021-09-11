import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';

import { ClassesService } from 'src/organizers/services/classes/classes.service';
import { CreateClassDto, UpdateClassDto } from 'src/organizers/dtos/class.dto';

@Controller('classes')
export class ClassesController {
    constructor(private classesService: ClassesService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Get()
    getClasses() {
        return this.classesService.findAll();
    }

    @Get(':id')
    getClass(@Param('id') id: string) {
        return this.classesService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateClassDto) {
        const res = this.classesService.create(payload);
        return {
            message: 'Crear',
            res,
        };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateClassDto) {
        const res = this.classesService.update(payload);
        return {
            message: 'Update',
            id,
            res,
        };
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        const res = this.classesService.delete(id);
        return {
            message: 'Delete',
            res,
        };
    }
}
