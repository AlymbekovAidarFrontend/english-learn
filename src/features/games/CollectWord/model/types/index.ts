import { EWordLanguages, Word } from "@/entities/Word";

export type TTSelectedWordValue = { id: string | number; selected: boolean, value: string }
export type TTSelectedWordKey = number | string
export type TSelectedWord = Record<TTSelectedWordKey, TTSelectedWordValue>

export interface ICollectWordSchema {
    word: Nullable<Word>;
    collectedWord: TSelectedWord;
    selectedLanguage: EWordLanguages;
}