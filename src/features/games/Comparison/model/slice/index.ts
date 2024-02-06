import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState, { initialSelectedWordIds } from "../initialState";

import { Word, EWordLanguages } from "@/entities/Word";
import { getRandomSynonymWord } from '@/shared/lib';



export const comparisonSlice = createSlice({
    name: 'comparison',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Word[]>) => {
            state.correctWordIds = [];
            state.selectedWordIds = initialSelectedWordIds;
            state.list = action.payload.map((word) => ({
                ...word,
                translations: getRandomSynonymWord(word),
            }));
        },
        select: (state, action: PayloadAction<{ language: EWordLanguages, id: number }>) => {
            const { language, id } = action.payload;
            state.selectedWordIds[language] = id;
        },
        check: (state) => {
            if(state.selectedWordIds.russian && state.selectedWordIds.english) {
                const { russian, english } = state.selectedWordIds;

                if (russian === english) {
                    state.correctWordIds = [...state.correctWordIds, state.selectedWordIds.english];
                    state.selectedWordIds = initialSelectedWordIds;
                } else {
                    state.selectedWordIds = initialSelectedWordIds;
                }
            }
        },
        completed: (state) => {
            state.correctWordIds = [];
        },
    },
});

export const { actions: comparisonActions } = comparisonSlice;
export const { reducer: comparisonReducer, name } = comparisonSlice;