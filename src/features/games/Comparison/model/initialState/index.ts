import { IComparisonSchema } from "../types";

import { EWordLanguages } from "@/entities/Word/model/types/word";


export const initialSelectedWordIds = {
    [EWordLanguages.ENGLISH]: null,
    [EWordLanguages.RUSSIAN]: null
};

const initialState: IComparisonSchema = {
    list: [],
    selectedWordIds: initialSelectedWordIds,
    correctWordIds: [],
};
export default initialState;
