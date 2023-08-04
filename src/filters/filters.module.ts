import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FiltersController } from './controllers/filters/filters.controller';
import { FiltersService } from './services/filters/filters.service';
import { Filter, FilterSchema } from './entities/filter.entity'
import { TagsController } from './controllers/tags/tags.controller';
import { TagsService } from './services/tags/tags.service';
import { Tag, TagSchema } from './entities/tag.entity';
import { LessonsController } from './controllers/lessons/lessons.controller';
import { LessonsService } from './services/lessons/lessons.service';
import { Lesson, LessonSchema } from './entities/lesson.entity';
import { Source, SourceSchema } from './entities/source.entity';
import { LessonSource, LessonSourceSchema } from './entities/lesson-source.entity';
import { LessonSourceController } from './controllers/lesson-source/lesson-source.controller';
import { LessonSourceService } from './services/lesson-source/lesson-source.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
        name: Filter.name,
        schema: FilterSchema
    }, {
        name: Tag.name,
        schema: TagSchema
    }, {
        name: Lesson.name,
        schema: LessonSchema 
    }, {
        name: Source.name,
        schema: SourceSchema 
    }, {
      name: LessonSource.name,
      schema: LessonSourceSchema 
  }
  ])],
  controllers: [FiltersController, TagsController, LessonsController, LessonSourceController],
  providers: [FiltersService, TagsService, LessonsService, LessonSourceService],
  exports: [FiltersService]
})
export class FiltersModule {}
