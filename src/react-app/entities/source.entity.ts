export interface Source {
    _id: number,
    name: string,
    link: string,
    size: number,
    progress: number,
    _languageId: number,
    _areaId: number,
    _sectionsId: Array<number | string>
}