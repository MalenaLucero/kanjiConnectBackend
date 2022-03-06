import { Module } from '@nestjs/common';
import { ReactAppController } from './controllers/react-app.controller';
import { ReactAppService } from './services/react-app.service';
import { DataHealthService } from './services/data-health.service';

@Module({
  controllers: [ReactAppController],
  providers: [ReactAppService, DataHealthService]
})
export class ReactAppModule {}
