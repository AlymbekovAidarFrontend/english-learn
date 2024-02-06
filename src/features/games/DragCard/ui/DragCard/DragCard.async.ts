import { lazy } from 'react';

export const DragCardAsync = lazy(
    () => import('./index'),
);
