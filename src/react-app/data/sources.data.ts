import { Source } from "../entities/source.entity";

const emptySource = {
    _id: 0,
    name: '',
    link: '',
    size: 0,
    progress: 0,
    _languageId: 0,
    _areaId: 0,
    _sectionsId: []
}

export const SOURCES: Source[] = [
    {
        _id: 1,
        name: 'Try N1',
        link: '',
        size: 16,
        progress: 1,
        _languageId: 1,
        _areaId: 1,
        _sectionsId: []
    }, {
        _id: 2,
        name: 'JavaScript超入門コース',
        link: 'https://www.youtube.com/watch?v=_ExoqS3s17Y&list=PLavQwENTsEBVkrFMHDYs-EatjsxyoNNO-',
        size: 13,
        progress: 1,
        _languageId: 1,
        _areaId: 2,
        _sectionsId: []
    }, {
        _id: 3,
        name: 'コーヒーが冷めないうちに',
        link: '',
        size: 5,
        progress: 0,
        _languageId: 1,
        _areaId: 3,
        _sectionsId: []
    }, {
        _id: 4,
        name: '中級へ行こう',
        link: '',
        size: 10,
        progress: 0,
        _languageId: 1,
        _areaId: 5,
        _sectionsId: []
    }, {
        _id: 5,
        name: 'フレデリック 「ケンジとコウジのソウセイジカン」',
        link: 'https://www.youtube.com/watch?v=U_jykjGsFu0&list=PLdkuu8lINVU5oVGLU46ysqeqDlabD5OiD',
        size: 8,
        progress: 0,
        _languageId: 1,
        _areaId: 4,
        _sectionsId: []
    }
]

