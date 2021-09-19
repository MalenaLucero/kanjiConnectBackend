import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../../services/users/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { FiltersService } from 'src/filters/services/filters/filters.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
                private filtersService: FiltersService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Roles(Role.ADMIN)
    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Roles(Role.ADMIN)
    @Get(':id')
    getTag(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.findOne(id);
    }

    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() payload: CreateUserDto) {
        const user = await this.usersService.create(payload);
        if (user) {
            const filter = { user: user._id, tags: [], lessons: [] }
            this.filtersService.create(filter)
        }
        return user;
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
        return this.usersService.update(id, payload);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id', MongoIdPipe) id: string) {
        const user = await this.usersService.delete(id);
        if (user) {
            this.filtersService.deleteByUser(id);
        }
        return user;
    }
}
