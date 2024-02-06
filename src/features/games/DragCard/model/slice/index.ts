import { createSlice, PayloadAction } from "@reduxjs/toolkit";


import initialState from "../initialState";
import { EAnswers } from "../types";

import { EWordLanguages, Word } from "@/entities/Word";
import { LOCAL_STORAGE_DRAG_CARD_SELECTED_LANGUAGE } from "@/shared/const";
import { getRandomItems, getRandomSynonymWord } from "@/shared/lib";


export const dragCardSlice = createSlice({
    name: "dragCard",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<Word[]>) => {
            state.dragCardWordList = action.payload;
        },
        set: (state, action: PayloadAction<Word[]>) => {
            const filteredWords = action.payload.filter(
                (word) =>
                    !Object.values(state.answers).flat(1).includes(word.id)
            );

            if (filteredWords.length === 0) {
                return;
            }

            const randomWord = getRandomItems<Word>([...filteredWords], 1)[0];
            state.word = {
                ...randomWord,
                translations: getRandomSynonymWord(randomWord),
            };
        },
        toggleLang: (state) => {
            const newLanguage =
                state.selectedLanguage === EWordLanguages.ENGLISH
                    ? EWordLanguages.RUSSIAN
                    : EWordLanguages.ENGLISH;

            state.selectedLanguage = newLanguage;
            localStorage.setItem(
                LOCAL_STORAGE_DRAG_CARD_SELECTED_LANGUAGE,
                newLanguage
            );
        },
        setAnswer: (state, action: PayloadAction<EAnswers>) => {
            if (!state.word || Object.values(state.answers).flat(1).includes(state.word.id)) {
                return;
            }

            const { payload } = action;
            state.answers[payload] = [...state.answers[payload], state.word.id];
        },
        reset: (state) => {
            state.answers[EAnswers.YES] = [];
            state.answers[EAnswers.NO] = [];
            state.word = null;
        },
    },
});

export const {
    actions: dragCardActions,
    reducer: dragCardReducer,
    name,
} = dragCardSlice;
