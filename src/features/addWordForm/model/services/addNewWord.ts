import { createAsyncThunk } from '@reduxjs/toolkit';

import { EWordSynonyms, IAddNewWord } from "../types";

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Word, wordActions, EWordLanguages } from '@/entities/Word';
import { USER_LOCALSTORAGE_KEY } from "@/shared/const";



export const addNewWord = createAsyncThunk<
    Word,
    IAddNewWord,
    ThunkConfig<string>
>('word/add', async (wordData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

    try {
        const response = await extra.api.post<Word>('/words', {
            translations: {
                [EWordLanguages.ENGLISH]: wordData[EWordLanguages.ENGLISH],
                [EWordLanguages.RUSSIAN]: wordData[EWordLanguages.RUSSIAN],
            },
            synonyms: {
                [EWordLanguages.ENGLISH]: wordData[EWordSynonyms.ENGLISH],
                [EWordLanguages.RUSSIAN]: wordData[EWordSynonyms.RUSSIAN],
            }
        }, { headers: { Authorization: token } });

        if (!response.data) {
            throw new Error();
        }

        dispatch(wordActions.add(response.data));

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
