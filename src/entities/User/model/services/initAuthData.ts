import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types';

import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import {
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const';


export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!userId) {
            return rejectWithValue('');
        }

        try {
            return await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap();

        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);
