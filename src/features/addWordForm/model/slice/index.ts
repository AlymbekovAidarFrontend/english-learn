import { createSlice, PayloadAction } from '@reduxjs/toolkit';


import initialState from "../initialState";
import { addNewWord } from "../services/addNewWord";
import { EWordSynonyms } from '../types';

import { EWordLanguages } from "@/entities/Word";



export const addWordFormSlice = createSlice({
    name: 'addWordForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<{ value: string; key: EWordLanguages | EWordSynonyms }>) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        clear: (state) => {
            state[EWordLanguages.RUSSIAN] = "";
            state[EWordLanguages.ENGLISH] = "";
            state[EWordSynonyms.RUSSIAN] = "";
            state[EWordSynonyms.ENGLISH] = "";
            state.synonyms[EWordLanguages.ENGLISH] = [];
            state.synonyms[EWordLanguages.RUSSIAN] = [];
            state.isWithSynonyms = false;
        },
        addSynonym: (state, action: PayloadAction<EWordLanguages>) => {
            const { payload } = action;

            const synonymLanguage =
                payload === EWordLanguages.RUSSIAN
                    ? EWordSynonyms.RUSSIAN
                    : EWordSynonyms.ENGLISH;

            state.synonyms[payload] = [...state.synonyms[payload], state[synonymLanguage]];

            if (payload === EWordLanguages.RUSSIAN) state[EWordSynonyms.RUSSIAN] = "";
            else state[EWordSynonyms.ENGLISH] = "";
        },
        toggleIsWithSynonyms: (state) => {
            state.isWithSynonyms = !state.isWithSynonyms;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewWord.pending, (state) => {
                state.error = undefined;
                state.loading = true;
            })
            .addCase(addNewWord.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addNewWord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: addWordFormActions } = addWordFormSlice;
export const { reducer: addWordFormReducer, name } = addWordFormSlice;
