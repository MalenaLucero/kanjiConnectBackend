export interface Source {
    _id: number,
    name: string,
    link: string,
    size?: number,
    _languageId: number,
    _areaId: number,
    _sectionsId: Array<number | string>
}