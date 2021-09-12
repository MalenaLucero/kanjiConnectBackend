import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FiltersController } from './controllers/filters/filters.controller';
import { FiltersService } from './services/filters/filters.service';
import { Filter, FilterSchema } from './entities/filter.entity'
import { TagsController } from './controllers/tags/tags.controller';
import { TagsService } from './services/tags/tags.service';
import { LessonsController } from './controllers/lessons/lessons.controller';
import { LessonsService } from './services/lessons/lessons.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
        name: Filter.name,
        schema: FilterSchema
    }
  ])],
  controllers: [FiltersController, TagsController, LessonsController],
  providers: [FiltersService, TagsService, LessonsService]
})
export class FiltersModule {}
