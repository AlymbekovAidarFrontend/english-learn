import { createAsyncThunk } from '@reduxjs/toolkit';


import { getWordDataByIdQuery } from '../../api/wordApi';
import { Word } from "../types/word";

import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";


export const initWordData = createAsyncThunk<Word[], void, ThunkConfig<string>>(
    'word/getInitData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await dispatch(
                getWordDataByIdQuery(undefined),
            ).unwrap();

            return response;
        } catch (e) {
            return rejectWithValue('');
        }
    },
);
