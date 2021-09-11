import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users/user.controller';
import { UsersService } from './services/users/user.service';
import { User, UserSchema } from './entities/user.entity';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        }
    ])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
