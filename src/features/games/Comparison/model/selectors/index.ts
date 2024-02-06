import { createSelector } from "@reduxjs/toolkit";

import { initialSelectedWordIds } from "../initialState";

import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";



export const getComparison = (state: StateSchema) => state.comparison;
export const getComparisonWordList = createSelector(getComparison, (comparison) => comparison?.list || []);
export const getComparisonSelectedWordIds =
    createSelector(getComparison, (comparison) => comparison?.selectedWordIds || initialSelectedWordIds);
export const getComparisonCorrectWordIds = (state: StateSchema) => state.comparison?.correctWordIds || [];

export const getComparisonState = createSelector(
    [
        getComparisonWordList,
        getComparisonSelectedWordIds,
        getComparisonCorrectWordIds
    ],
    (
        comparisonList,
        selectedComparisonIds,
        completedWordIds
    ) => ({
        comparisonList,
        selectedComparisonIds,
        completedWordIds
    })
);