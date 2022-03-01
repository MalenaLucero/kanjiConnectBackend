import { KOREAN_LESSON_1_SECTIONS } from './korean-sections/lesson1sections.data';
import { Lesson } from "../entities/lesson.entity";

export const KOREAN_LESSONS: Lesson[] = [
    {
        _id: 1,
        link: '',
        date: new Date(),
        nextLessonDate: new Date(),
        _languageId: 1,
        sections: KOREAN_LESSON_1_SECTIONS
    }
]