import { lazy } from 'react';

export const LogoutConfirmFormAsync = lazy(
    () => import('./LogoutConfirmForm'),
);
