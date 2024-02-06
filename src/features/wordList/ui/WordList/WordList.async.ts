import { FC, lazy } from 'react';

import { WordListProps } from './WordList';

export const WordListAsync = lazy<FC<WordListProps>>(
    () => import('./WordList'),
);
