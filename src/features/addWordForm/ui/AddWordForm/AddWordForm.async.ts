import { lazy } from 'react';

export const AddWordFormAsync = lazy(
    () => import('./AddWordForm'),
);
