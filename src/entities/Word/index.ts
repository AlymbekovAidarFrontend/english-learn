export { initWordData } from './model/services/initWordData';
export *  from './model/selectors/wordSelectors';

export type { WordSchema, Word, EWordTranslations } from './model/types/word';
export * from './model/types/word';
export * from './api/wordApi';

export { wordReducer, wordActions, wordSlice, name } from './model/slice/wordSlice';
