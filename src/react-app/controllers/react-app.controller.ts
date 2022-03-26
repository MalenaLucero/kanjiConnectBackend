import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { DataHealthService } from '../services/data-health.service';
import { ReactAppService } from '../services/react-app.service';

@Controller('react-app')
export class ReactAppController {
    constructor(private service: ReactAppService,
                private healthService: DataHealthService) {}

    @Get('song')
    getRandomSong(@Query('language', ParseIntPipe) languageId: number,
                @Query('previous') previousId?) {
        if (previousId) previousId = parseInt(previousId, 10);
        return this.service.getRandomSong(languageId, previousId);
    }

    @Get('lesson')
    getLessonState(@Query('language', ParseIntPipe) languageId: number) {
        return this.service.getLessonState(languageId);
    }

    @Get('lesson-section')
    getLessonSection(@Query('language', ParseIntPipe) languageId: number,
                    @Query('section', ParseIntPipe) sectionId: number) {
        return this.service.getLessonSectionById(languageId, sectionId);
    }

    @Get('health-check')
    checkDataHealth() {
        return this.healthService.checkDataHealth();
    }
}
