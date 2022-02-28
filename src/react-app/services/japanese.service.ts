import { SOURCES } from './../data/sources.data';
import { AREAS } from './../data/areas.data';
import { LESSONS } from './../data/lessons.data';
import { Injectable } from '@nestjs/common';
import { Lyric } from '../entities/lyric.entity';
import { LYRICS } from './../data/lyrics.data';
import { Lesson } from '../entities/lesson.entity';
import { Source } from '../entities/source.entity';
import { Area } from '../entities/area.entity';

@Injectable()
export class JapaneseService {
    getRandomSong(previousSongId: number): Lyric {
        const randomIndex = Math.floor(Math.random() * LYRICS.length);
        if (LYRICS.length > 1) {
            const randomSong = LYRICS[randomIndex];
            if (randomSong._id === previousSongId) {
                return this.getRandomSong(previousSongId)
            } else {
                return randomSong;
            }
        } else {
            return LYRICS[randomIndex]
        }
    }

    getLessonState() {
        return {
            lesson: this.generateLastLessonObject(LESSONS, SOURCES),
            areasSourcesAndSections: this.generateAreaWithSourcesObject(AREAS, SOURCES)
        }
    }

    generateLastLessonObject(lessons: Lesson[], sources: Source[]) {
        const lastLessonIndex = lessons.length - 1
        const lastLesson = lessons[lastLessonIndex];
        lastLesson.sections = lastLesson.sections.map(section => {
            return {
                ...section, 
                sourceName: sources.find(source => source._id === section._sourceId).name
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
