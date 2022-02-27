import { Lesson } from "../entities/lesson.entity";

export const LESSONS: Lesson[] = [
    {
        _id: 1,
        link: 'https://docs.google.com/document/d/1j-VuNtxvSSHxEOp0LT-Cp5DJbG5tKTCbDiPC2EDzQss/edit',
        date: new Date(),
        nextLessonDate: new Date(),
        _languageId: 1,
        _sectionsId: [11, 12, 13]
    }
]