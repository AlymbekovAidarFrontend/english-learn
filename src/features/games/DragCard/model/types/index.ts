import { EWordLanguages, Word } from "@/entities/Word";

export enum EAnswers {
    YES = "yes",
    NO = "no"
}

interface IAnswers {
    [EAnswers.YES]: number[],
    [EAnswers.NO]: number[]
}

export interface IDragCardSchema {
    word: Nullable<Word>;
    dragCardWordList: Word[];
    selectedLanguage: EWordLanguages;
    answers: IAnswers;
}