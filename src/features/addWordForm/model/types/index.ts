import { EWordLanguages } from "@/entities/Word";

export enum EWordSynonyms {
    ENGLISH = "englishSynonym",
    RUSSIAN = "russianSynonym"
}

export interface AddWordFormSchema {
    [EWordLanguages.ENGLISH]: string;
    [EWordLanguages.RUSSIAN]: string;
    [EWordSynonyms.ENGLISH]: string;
    [EWordSynonyms.RUSSIAN]: string;
    synonyms: {
      [EWordLanguages.ENGLISH]: string[],
      [EWordLanguages.RUSSIAN]: string[]
    },
    isWithSynonyms: boolean;
    loading: boolean;
    error?: string;
}

export interface IAddNewWord {
    [EWordLanguages.RUSSIAN]: string;
    [EWordLanguages.ENGLISH]: string;
    [EWordSynonyms.RUSSIAN]: string[];
    [EWordSynonyms.ENGLISH]: string[]
}