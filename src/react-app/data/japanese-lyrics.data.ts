import { Lyric } from "../entities/lyric.entity";

export const JAPANESE_LYRICS: Lyric[] = [
    {
        _id: 1,
        title: 'Chills?',
        artist: 'Kiro Akiyama',
        link: 'https://www.youtube.com/watch?v=H4rNPDwEg1s',
        studyLink: 'https://docs.google.com/document/d/1gCPFfanwYhXqY9PDuyqyAvdgb3Y_6Tu994oTUk-gpXg/edit#heading=h.5hc0kgmthqsj',
        _languageId: 1,
        segment: [
            "臓器の重さがいつもと違うんだ",
            "違和感の正体探るのも変だ",
            "何か、僕にはとてもわからない",
            "次元の魔物が住んでいる？"
        ], 
        vocabulary: [
            { word: '臓器', infinitive: null, reading: 'ぞうき', meaning: 'internal organs'},
            { word: '違和感', infinitive: null, reading: 'いわかん', meaning: 'sense of discomfort'},
            { word: '正体', infinitive: null, reading: 'しょうたい', meaning: 'true form'},
            { word: '探る', infinitive: '探る', reading: 'さぐる', meaning: 'to feel around for'},
            { word: '次元', infinitive: null, reading: 'じげん', meaning: 'dimension'},
            { word: '魔物', infinitive: null, reading: 'まもの', meaning: 'evil spirit'}
        ]
    }, {
        _id: 2,
        title: 'Stoned Child',
        artist: 'Tatsuya Kitani',
        link: 'https://www.youtube.com/watch?v=fxTwPBUvFLA',
        studyLink: 'https://docs.google.com/document/d/1gCPFfanwYhXqY9PDuyqyAvdgb3Y_6Tu994oTUk-gpXg/edit#heading=h.cme931r2mw4k',
        _languageId: 1,
        segment: [
            "ウィーアーストーンドチルドレン",
            "流れていく時間はずっとスロウなままで",
            "感覚だけ尖っていった",
            "「人間なんて辞めちまおうぜ」",
            "ウィーアーストーンドチルドレン",
            "かわいそうな私、だなんて",
            "ベロベロに酔っ払ってもいいじゃないか",
            "足がもつれて歩けないね",
            "ウィーアーストーンドチルドレン",
            "へべれけじゃなきゃ生きれないよ"
        ], vocabulary: [
            { word: '尖って', infinitive: '尖る', reading: 'とがる', meaning: 'to become sharp'},
            { word: 'ベロベロ', infinitive: null, reading: null, meaning: 'dead drunk'},
            { word: '酔っ払って', infinitive: '酔っ払う', reading: 'よっぱらう', meaning: 'to get drunk'},
            { word: 'もつれて', infinitive: '縺れる', reading: 'もつれる', meaning: 'to get entangled'},
            { word: 'へべれけ', infinitive: null, reading: null, meaning: 'dead drunk'}
        ]
    }
]