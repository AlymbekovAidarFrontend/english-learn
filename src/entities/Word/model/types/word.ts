export enum EWordLanguages {
    RUSSIAN = 'russian',
    ENGLISH = 'english'
}

export type EWordTranslations = Record<EWordLanguages, string>
export interface Word {
    translations: EWordTranslations,
    synonyms: {
        [EWordLanguages.ENGLISH]: string[],
        [EWordLanguages.RUSSIAN]: string[]
    },
    id: number
}

export interface WordSchema {
    words: Word[];
    isLoading: boolean;
}