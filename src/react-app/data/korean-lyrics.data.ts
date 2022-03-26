import { Lyric } from './../entities/lyric.entity';

export const KOREAN_LYRICS: Lyric[] = [
    {
        _id: 1,
        _languageId: 2,
        title: 'Connect with US',
        artist: 'Oneus',
        link: 'https://www.youtube.com/watch?v=hdt-Wvzg8CA',
        studyLink: '',
        segment: [
            '우린 이미 연결되어 있지',
            '서로 모든 것을 알고 있지',
            '시공간의 의미는 퇴색된 지 오래오래',
            '결국 영과 일만 남아있지',
            '어디에 있어도 상관없지',
            '서로의 감정을 공유하지'
        ], vocabulary: [
            { word: '이미', infinitive: null, reading: null, meaning: 'already'},
            { word: '연결되어', infinitive: '연결되다', reading: null, meaning: 'to be connected'},
            { word: '서로', infinitive: null, reading: null, meaning: 'each other'},
            { word: '시공간', infinitive: null, reading: null, meaning: 'space-time'},
            { word: '퇴색된', infinitive: '퇴색되다', reading: null, meaning: 'to discolour'},
            { word: '오래오래', infinitive: null, reading: null, meaning: 'for a long long time'},
            { word: '결국', infinitive: null, reading: null, meaning: 'eventually'},
            { word: '남아', infinitive: '남다', reading: null, meaning: 'to remain'},
            { word: '상관없지', infinitive: '상관없다', reading: null, meaning: 'to have nothing to do with'},
            { word: '감정', infinitive: null, reading: null, meaning: 'feeling(s)'},
            { word: '공유하지', infinitive: '공유하다', reading: null, meaning: 'to share'},
        ]
    }, {
        _id: 2,
        _languageId: 2,
        title: '월하미인 (月下美人 : LUNA)',
        artist: 'Oneus',
        link: 'https://www.youtube.com/watch?v=oe2_BrZx9mc',
        studyLink: '',
        segment: [
            '한밤에 밤에 핀 눈부신 빛처럼',
            '달빛에 반해 핀 하이얀 꽃처럼',
            '한순간 사라진 하룻밤 꿈처럼',
            '달 아래 너는 참 아름답구나'
        ], vocabulary: [
            { word: '한밤', infinitive: null, reading: null, meaning: 'midnight'},
            { word: '핀', infinitive: '피다', reading: null, meaning: 'to bloom'},
            { word: '눈부신', infinitive: '눈부시다', reading: null, meaning: 'dazzling'},
            { word: '반해', infinitive: '반하다', reading: null, meaning: 'to fall in love (with)'},
            { word: '사라진', infinitive: '사라지다', reading: null, meaning: 'to disappear'},
            { word: '하룻밤', infinitive: null, reading: null, meaning: 'one night'},
            { word: '참', infinitive: null, reading: null, meaning: 'really'},
            { word: '아름답구나', infinitive: '아름답다', reading: null, meaning: 'beautiful'},
        ]
    }
]