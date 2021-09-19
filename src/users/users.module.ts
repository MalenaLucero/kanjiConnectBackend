import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users/user.controller';
import { UsersService } from './services/users/user.service';
import { User, UserSchema } from './entities/user.entity';
import { FiltersModule } from 'src/filters/filters.module';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
import { DataModule } from 'src/data/data.module';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        }
    ]), FiltersModule, DataModule],
    controllers: [UsersController, ProfileController],
    providers: [UsersService, ProfileService],
    exports: [UsersService]
})
export class UsersModule {}
