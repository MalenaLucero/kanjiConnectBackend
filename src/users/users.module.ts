import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users/user.controller';
import { UsersService } from './services/users/user.service';
import { User, UserSchema } from './entities/user.entity';
import { FiltersModule } from 'src/filters/filters.module';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        }
    ]), FiltersModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
