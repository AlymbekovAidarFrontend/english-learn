import { createSelector } from "@reduxjs/toolkit";

import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getAuthPassword = (state: StateSchema) =>
    state?.auth?.password || '';

export const getAuthUsername = (state: StateSchema) =>
    state?.auth?.username || '';
export const getAuthIsLoading = (state: StateSchema) =>
    state?.auth?.isLoading || false;
export const getAuthIsLogin = (state: StateSchema) =>
    state?.auth?.isLogin || false;
export const getAuthError = (state: StateSchema) => state?.auth?.error;

export const getAuthState = createSelector(
    [
        getAuthUsername,
        getAuthPassword,
        getAuthIsLoading,
        getAuthIsLogin,
        getAuthError
    ],
    (
        username,
        password,
        isLoading,
        isLogin,
        error
    ) => ({
        username,
        password,
        isLoading,
        isLogin,
        error
    })
);