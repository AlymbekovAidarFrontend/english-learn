import { Word, EWordLanguages } from "@/entities/Word";

type WordIds = {
    [EWordLanguages.ENGLISH]: Nullable<number>;
    [EWordLanguages.RUSSIAN]: Nullable<number>;
}

export interface IComparisonSchema {
    list: Word[],
    selectedWordIds: WordIds,
    correctWordIds: number[],
}