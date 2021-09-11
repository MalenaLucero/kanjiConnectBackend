import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DataModule } from './data/data.module';
import { OrganizersModule } from './organizers/organizers.module';
import { DatabaseModule } from './database/database.module';

import { environments } from './environments';
import { UsersModule } from './users/users.module';
import config from './config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: environments[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true,
    validationSchema: Joi.object({
      MONGO_USERNAME: Joi.string().required(),
      MONGO_PASSWORD: Joi.string().required(),
      MONGO_DB: Joi.string().required(),
      MONGO_HOST: Joi.string().required()
    })
  }), DataModule, OrganizersModule, DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
