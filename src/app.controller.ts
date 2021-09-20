import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRootMessage(): string {
    return 'Kanji Connect v2';
  }

}
