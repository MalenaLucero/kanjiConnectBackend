import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClassesController } from './controllers/classes/classes.controller';
import { ClassesService } from './services/classes/classes.service';
import { TagsController } from './controllers/tags/tags.controller';
import { TagsService } from './services/tags/tags.service';
import { Tag, TagSchema } from './entities/tag.entity';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Tag.name,
            schema: TagSchema
        }
    ])],
    controllers: [TagsController, ClassesController],
    providers: [TagsService, ClassesService],
    //para que otros modulos puedan usar el servicio
    exports: [TagsService]
})
export class OrganizersModule {}
