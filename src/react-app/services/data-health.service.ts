import { ReactAppService } from './react-app.service';
import { Injectable } from '@nestjs/common';
import { JAPANESE_LESSONS } from '../data/japanese-lessons.data';
import { JAPANESE_SOURCES } from '../data/japanese-sources.data';
import { Source } from '../entities/source.entity';
import { Lesson } from '../entities/lesson.entity';
import { emptyHealthReport, Language, CheckedItem } from '../entities/health-report.entity';

@Injectable()
export class DataHealthService {
    private healthReport = emptyHealthReport;

    constructor(private reactAppService: ReactAppService) {}

    checkDataHealth() {
        this.checkSectionHealth(JAPANESE_SOURCES, JAPANESE_LESSONS, 'japanese');
        return this.healthReport;
    }

    checkSectionHealth(sources: Source[], lessons: Lesson[], language: Language) {
        sources.forEach(source => {
            source.sections.forEach(section => {
                if (section.hasOwnProperty('_id')) {
                    const lessonId = this.reactAppService.getLessonIdFromSectionId(section._id);
                    const lessonSection = lessons.find(lesson => lesson._id === lessonId).sections
                                            .find(sec => sec._id === section._id)
                    if(!lessonSection) {
                        this.setHealthReportError(language, `Section with id ${section._id} not found`)
                    } else if (lessonSection.title !== section.name) {
                        this.setHealthReportError(language, `Title mismatch in section with id ${section._id}`)
                    } else {
                        this.setCheckedElementId(language, 'section', section._id)
                    }
                }
            })
        })
    }

    setHealthReportError(language: Language, errorMessage: string) {
        this.healthReport[language].error.push(errorMessage);
    }

    setCheckedElementId(language: Language, type: CheckedItem, id: number) {
        this.healthReport[language].checked[type].push(id)
    }
}
