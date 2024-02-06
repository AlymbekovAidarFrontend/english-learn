import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { wordActions } from "@/entities/Word";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const";

export const removeWord = createAsyncThunk<
    number,
    number,
    ThunkConfig<string>
>('word/add', async (id, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

    try {
        const response = await extra.api.delete<number>(`/words/${id}`,  {
            headers: {
                Authorization: token
            }
        });

        dispatch(wordActions.remove(id));
        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
