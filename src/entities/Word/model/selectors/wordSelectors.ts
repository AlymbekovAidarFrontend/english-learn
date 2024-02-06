import { createSelector } from "@reduxjs/toolkit";

import { StateSchema } from "@/app/providers/StoreProvider";

export const getWord = (state: StateSchema) => state.word;

export const getWordList = createSelector(getWord, (word) => (term?: string) => {

    if (term) {
        const lowerCasedTerm = term.toLowerCase();
        return word?.words?.filter(({ translations }) =>
            translations.english.toLowerCase().includes(lowerCasedTerm)
            || translations.russian.toLowerCase().includes(lowerCasedTerm)
        ) ?? [];
    }

    return word?.words ?? [];
});

export const getWordListIsLoading = (state: StateSchema) => state.word?.isLoading;