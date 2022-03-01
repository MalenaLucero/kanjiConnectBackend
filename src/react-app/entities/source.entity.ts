interface sectionObject {
    _id?: number,
    name: string
}

export interface Source {
    _id: number,
    name: string,
    link: string,
    size?: number,
    _areaId: number,
    sections: Array<sectionObject>,
    progress?: number
}