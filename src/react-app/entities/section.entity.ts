export interface Section {
    _id: number,
    link: string,
    title: string,
    _sourceId: number,
    state: 'to do' | 'in progress' | 'done'
}