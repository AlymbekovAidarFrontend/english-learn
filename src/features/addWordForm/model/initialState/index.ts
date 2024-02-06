import { AddWordFormSchema, EWordSynonyms } from "../types";

import { EWordLanguages } from "@/entities/Word";


const initialState: AddWordFormSchema = {
    [EWordLanguages.ENGLISH]: "",
    [EWordLanguages.RUSSIAN]: "",
    [EWordSynonyms.ENGLISH]: "",
    [EWordSynonyms.RUSSIAN]: "",
    synonyms: {
        [EWordLanguages.RUSSIAN]: [],
        [EWordLanguages.ENGLISH]: []
    },
    isWithSynonyms: false,
    loading: false
};

export default initialState;
