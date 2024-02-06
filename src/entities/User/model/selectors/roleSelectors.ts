import { createSelector } from '@reduxjs/toolkit';

import { UserRole } from "../types";

import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';


export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN)),
);
export const isClassicUser = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.USER)),
);
