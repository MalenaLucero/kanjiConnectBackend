import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { JapaneseService } from '../services/japanese.service';

@Controller('japanese')
export class JapaneseController {
    constructor(private japaneseService: JapaneseService) {}

    @Get('song/:previous')
    getRandomSong(@Param('previous', ParseIntPipe) previousId: number) {
        return this.japaneseService.getRandomSong(previousId);
    }

    @Get('lesson')
    getLessonState() {
        return this.japaneseService.getLessonState();
    }
}
