import { createSelector } from "@reduxjs/toolkit";

import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { EWordLanguages } from "@/entities/Word";

export const getCollectWord = (state: StateSchema) => state.collectWord?.word?.translations;
export const getCollectedWordSelectedLanguage = (state: StateSchema) =>
    state.collectWord?.selectedLanguage || EWordLanguages.ENGLISH;
export const getCollectWordTranslated = createSelector([getCollectWord, getCollectedWordSelectedLanguage], (word, lang) => {
    if (word) {
        return lang === EWordLanguages.RUSSIAN ? word[EWordLanguages.RUSSIAN] : word[EWordLanguages.ENGLISH];
    } 
        return "";
    
});
export const getCollectedWord = (state: StateSchema) => state.collectWord?.collectedWord || {};

export const getCollectWordState = createSelector(
    [
        getCollectWord,
        getCollectedWordSelectedLanguage,
        getCollectWordTranslated,
        getCollectedWord
    ],
    (
        word,
        selectedLanguage,
        translatedWord,
        collectedWord
    ) => ({
        word,
        selectedLanguage,
        translatedWord,
        collectedWord
    })
);