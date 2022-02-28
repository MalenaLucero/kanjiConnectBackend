import { Module } from '@nestjs/common';
import { JapaneseController } from './controllers/japanese.controller';
import { KoreanController } from './controllers/korean.controller';
import { JapaneseService } from './services/japanese.service';
import { KoreanService } from './services/korean.service';

@Module({
  controllers: [JapaneseController, KoreanController],
  providers: [JapaneseService, KoreanService]
})
export class ReactAppModule {}
