import { ICollectWordSchema } from "../types";

import { EWordLanguages } from "@/entities/Word";
import { LOCAL_STORAGE_COLLECT_WORD_SELECTED_LANGUAGE } from "@/shared/const";


const initialState: ICollectWordSchema = {
    word: null,
    collectedWord: {},
    selectedLanguage: localStorage.getItem(LOCAL_STORAGE_COLLECT_WORD_SELECTED_LANGUAGE) as EWordLanguages
        || EWordLanguages.ENGLISH
};

export default initialState;