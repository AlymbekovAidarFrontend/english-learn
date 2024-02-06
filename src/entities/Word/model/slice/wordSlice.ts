import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initWordData } from "../services/initWordData";
import { WordSchema, Word } from '../types/word';

const initialState: WordSchema = {
    words: [],
    isLoading: false
};

export const wordSlice = createSlice({
    name: 'word',
    initialState,
    reducers: {
        get: (state, action: PayloadAction<Word[]>) => {
            state.words = action.payload;
        },
        add: (state, action: PayloadAction<Word>) => {
            state.words = [...state.words, action.payload];
        },
        remove: (state, action: PayloadAction<number>) => {
            state.words = state.words.filter(word => word.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initWordData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(initWordData.fulfilled, (state, { payload }) => {
                state.words = payload;
                state.isLoading = false;
            })
            .addCase(initWordData.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { actions: wordActions, reducer: wordReducer, name } = wordSlice;
