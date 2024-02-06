import { createSlice, PayloadAction } from '@reduxjs/toolkit';



import initialState from "../initialState";
import { TTSelectedWordValue } from "../types";

import { EWordLanguages, Word } from "@/entities/Word";
import { LOCAL_STORAGE_COLLECT_WORD_SELECTED_LANGUAGE } from "@/shared/const";
import { getRandomItems, getRandomSynonymWord } from '@/shared/lib';

export const collectWordSlice = createSlice({
    name: 'collectWord',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Word[]>) => {
            const randomWord = getRandomItems<Word>([...action.payload], 1)[0];
            state.word = {
                ...randomWord,
                translations: getRandomSynonymWord(randomWord)
            };
        },
        add: (state, action: PayloadAction<TTSelectedWordValue>) => {
            if (state.word) {
                const collectedWordLength = Object.keys(state.collectedWord).length;
                if (collectedWordLength === state.word.translations[state.selectedLanguage].length) {
                    return;
                }
            }

            state.collectedWord[action.payload.id] = action.payload;
        },
        toggleLang: (state) => {
            if (state.selectedLanguage === EWordLanguages.ENGLISH) {
                state.selectedLanguage = EWordLanguages.RUSSIAN;
                localStorage.setItem(LOCAL_STORAGE_COLLECT_WORD_SELECTED_LANGUAGE, EWordLanguages.RUSSIAN);
            } else {
                state.selectedLanguage = EWordLanguages.ENGLISH;
                localStorage.setItem(LOCAL_STORAGE_COLLECT_WORD_SELECTED_LANGUAGE, EWordLanguages.ENGLISH);
            }
        },
        removeLast: (state) => {
            if (!Object.keys(state.collectedWord).length) return;
            if (state.collectedWord) {
                const newState =
                    Object.entries(state.collectedWord)
                        .filter((elem, idx, curArr) => curArr.length - 1 !== idx);
                state.collectedWord = Object.fromEntries(newState);
            }
        },
        completed: (state) => {
            if (!state.word) {
                return;
            }
            state.collectedWord = {};
        }
    },
});
export const { actions: collectWordActions } = collectWordSlice;
export const { reducer: collectWordReducer, name } = collectWordSlice;
