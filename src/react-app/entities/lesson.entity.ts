export interface Lesson {
    _id: number,
    link: string,
    date: Date,
    nextLessonDate: Date,
    _languageId: number,
    _sectionsId: number[]
}