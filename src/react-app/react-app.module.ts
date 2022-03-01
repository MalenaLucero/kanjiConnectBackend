import { Module } from '@nestjs/common';
import { ReactAppController } from './controllers/react-app.controller';
import { ReactAppService } from './services/react-app.service';

@Module({
  controllers: [ReactAppController],
  providers: [ReactAppService]
})
export class ReactAppModule {}
