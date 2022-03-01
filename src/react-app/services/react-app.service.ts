import { KOREAN_LYRICS } from '../data/korean-lyrics.data';
import { JAPANESE_SOURCES } from '../data/japanese-sources.data';
import { AREAS } from '../data/areas.data';
import { JAPANESE_LESSONS } from '../data/japanese-lessons.data';
import { Injectable } from '@nestjs/common';
import { Lyric } from '../entities/lyric.entity';
import { JAPANESE_LYRICS } from '../data/japanese-lyrics.data';
import { Lesson } from '../entities/lesson.entity';
import { Source } from '../entities/source.entity';
import { Area } from '../entities/area.entity';
import { KOREAN_LESSONS } from '../data/korean-lessons.data';
import { KOREAN_SOURCES } from '../data/korean-sources.data';

@Injectable()
export class ReactAppService {
    getRandomSong(languageId: number, previousSongId: number = 0): Lyric {
        const lyrics: Lyric[] = languageId === 1 ? JAPANESE_LYRICS : KOREAN_LYRICS;
        const randomIndex = Math.floor(Math.random() * lyrics.length);
        if (lyrics.length > 1) {
            const randomSong = lyrics[randomIndex];
            if (randomSong._id === previousSongId) {
                return this.getRandomSong(languageId, previousSongId)
            } else {
                return randomSong;
            }
        } else {
            return lyrics[randomIndex]
        }
    }

    getLessonState(languageId: number) {
        if (languageId === 1) {
            return {
                lesson: this.generateLastLessonObject(JAPANESE_LESSONS, JAPANESE_SOURCES),
                areasSourcesAndSections: this.generateAreaWithSourcesObject(AREAS, JAPANESE_SOURCES)
            }
        } else {
            return {
                lesson: this.generateLastLessonObject(KOREAN_LESSONS, KOREAN_SOURCES),
                areasSourcesAndSections: this.generateAreaWithSourcesObject(AREAS, KOREAN_SOURCES)
            }
        }
    }

    generateLastLessonObject(lessons: Lesson[], sources: Source[]) {
        const lastLessonIndex = lessons.length - 1
        const lastLesson = lessons[lastLessonIndex];
        lastLesson.sections = lastLesson.sections.map(section => {
            return {
                ...section, 
                sourceName: sources.find(source => source._id === section._sourceId)?.name
            }
        })
        return lastLesson;
    }

    generateAreaWithSourcesObject(areas: Area[], sources: Source[]) {
        const areasWithSources = areas.map(area => {
            const areaSources = sources.filter(source => source._areaId === area._id);
            return { ...area, sources: this.setSourcesProgress(areaSources) }
        }).filter(area => area.sources.length > 0);

        return areasWithSources;
    }

    setSourcesProgress(sources: Source[]): Source[] {
        const sourcesWithProgress = sources.map(source => {
            const completedSections = source.sections.filter(section => section.hasOwnProperty('_id'));
            const progress = Math.floor(completedSections.length * 100 / source.sections.length);
            return {
                ...source,
                progress: progress
            }
        })
        return sourcesWithProgress;
    }
}
