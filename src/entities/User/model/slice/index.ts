import { createSlice, PayloadAction } from '@reduxjs/toolkit';


import { initAuthData } from '../services/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { UserSchema, User , JsonSettings } from '../types';

import {
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const';

const initialState: UserSchema = {
    _inited: false,
    isLoading: true
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, payload.id);
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = payload;
                }
            },
        );
        builder
            .addCase(
                initAuthData.fulfilled,
                (state, { payload }: PayloadAction<User>) => {
                    state.authData = payload;
                    state.isLoading = false;
                    state._inited = true;
                },
            )
            .addCase(
                initAuthData.rejected, 
                (state) => {
                    state._inited = true;
                    state.isLoading = false;
                });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions, reducer: userReducer, name } = userSlice;