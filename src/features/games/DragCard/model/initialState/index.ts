import { EAnswers, IDragCardSchema } from "../types";

import { EWordLanguages } from "@/entities/Word";
import {
    LOCAL_STORAGE_DRAG_CARD_SELECTED_LANGUAGE
} from "@/shared/const";


export const initialAnswers = {
    [EAnswers.YES]: [],
    [EAnswers.NO]: []
};

const initialState: IDragCardSchema = {
    word: null,
    dragCardWordList: [],
    selectedLanguage: localStorage.getItem(LOCAL_STORAGE_DRAG_CARD_SELECTED_LANGUAGE) as EWordLanguages
        || EWordLanguages.ENGLISH,
    answers: initialAnswers,
};

export default initialState;