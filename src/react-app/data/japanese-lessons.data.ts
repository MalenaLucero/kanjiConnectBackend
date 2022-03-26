import { JAPANESE_LESSON_1_SECTIONS } from './japanese-sections/lesson1sections.data';
import { Lesson } from "../entities/lesson.entity";

export const JAPANESE_LESSONS: Lesson[] = [
    {
        _id: 1,
        link: 'https://docs.google.com/document/d/1j-VuNtxvSSHxEOp0LT-Cp5DJbG5tKTCbDiPC2EDzQss/edit',
        date: new Date(2022, 3, 26),
        nextLessonDate: new Date(2022, 4, 9),
        _languageId: 1,
        sections: JAPANESE_LESSON_1_SECTIONS
    }
]