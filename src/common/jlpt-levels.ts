export const jlptLevels = {
    range: [1, 2, 3, 4, 5, null],
    min: 1,
    max: 5,
    default: null,
    levelText: [
        { level: 1, jishoText: 'jlpt-n1'},
        { level: 2, jishoText: 'jlpt-n2'},
        { level: 3, jishoText: 'jlpt-n3'},
        { level: 4, jishoText: 'jlpt-n4'},
        { level: 5, jishoText: 'jlpt-n5'},
    ]
}

export const jlptJishoTextToInteger = (jishoText: string): number | null => {
    const levelTextObj = jlptLevels.levelText.find(e => e.jishoText === jishoText);
    return levelTextObj ? levelTextObj.level : null;
}