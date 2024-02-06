import { createSelector } from "@reduxjs/toolkit";

import { EWordSynonyms } from "../types";

import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { EWordLanguages } from "@/entities/Word";


export const getAddWordEnglishFormText = (state: StateSchema) =>
    state.addWordForm?.[EWordLanguages.ENGLISH] ?? '';
export const getAddWordRussianFormText = (state: StateSchema) =>
    state.addWordForm?.[EWordLanguages.RUSSIAN] ?? '';
export const getAddWordEnglishSynonymFormText = (state: StateSchema) =>
    state.addWordForm?.[EWordSynonyms.ENGLISH] ?? '';
export const getAddWordRussianSynonymFormText = (state: StateSchema) =>
    state.addWordForm?.[EWordSynonyms.RUSSIAN] ?? '';
export const getAddWordRussianSynonyms = (state: StateSchema) =>
    state.addWordForm?.synonyms[EWordLanguages.RUSSIAN] ?? [];
export const getAddWordEnglishSynonyms = (state: StateSchema) =>
    state.addWordForm?.synonyms[EWordLanguages.ENGLISH] ?? [];
export const getAddWordIsWithSynonyms = (state: StateSchema) =>
    state.addWordForm?.isWithSynonyms ?? false;

export const getAddWordSelector = createSelector([
    getAddWordEnglishFormText,
    getAddWordRussianFormText,
    getAddWordEnglishSynonymFormText,
    getAddWordRussianSynonymFormText,
    getAddWordEnglishSynonyms,
    getAddWordRussianSynonyms,
    getAddWordIsWithSynonyms
], (
    english,
    russian, 
    englishSynonym, 
    russianSynonym,
    englishSynonyms,
    russianSynonyms,
    isWithSynonyms
) => ({
    english,
    russian,
    englishSynonym,
    russianSynonym,
    englishSynonyms,
    russianSynonyms,
    isWithSynonyms
}));

export const getAddWordFormError = (state: StateSchema) =>
    state.addWordForm?.error;
