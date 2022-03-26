interface vocabularyItem {
    word: string,
    infinitive: string | null,
    reading: string | null,
    meaning: string
}

export interface Lyric {
    _id: number,
    title: string,
    artist: string,
    link: string,
    studyLink: string,
    _languageId: number,
    segment: string[], 
    vocabulary: vocabularyItem[]
}