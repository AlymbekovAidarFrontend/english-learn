import { createSelector } from "@reduxjs/toolkit";

import { initialAnswers } from "../initialState";

import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { EWordLanguages } from "@/entities/Word";


export const getDragCardWord = (state: StateSchema) => state.dragCard?.word;
export const getDragCardWordList = (state: StateSchema) => state.dragCard?.dragCardWordList || [];
export const getDragCardSelectedLanguage = (state: StateSchema) =>
    state.dragCard?.selectedLanguage || EWordLanguages.ENGLISH;
export const getDragCardAnswers = (state: StateSchema) => state.dragCard?.answers || initialAnswers;
export const getDragCardAnswerCount = createSelector(getDragCardAnswers, (answers) => Object.values(answers).flat().length);

export const getDragCardState = createSelector(
    [
        getDragCardWord,
        getDragCardWordList,
        getDragCardSelectedLanguage,
        getDragCardAnswers,
        getDragCardAnswerCount
    ],
    (
        word,
        dragCardWordList,
        selectedLanguage,
        answers,
        answersCount
    ) => ({
        word,
        dragCardWordList,
        selectedLanguage,
        answers,
        answersCount
    })
);