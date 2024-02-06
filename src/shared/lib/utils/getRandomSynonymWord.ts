
import { getRandomItems } from "./getRandomItems";
import { Word } from "../../../entities/Word";

import { EWordLanguages, EWordTranslations } from "@/entities/Word";

export function getRandomSynonymWord<T extends Word>(word: T): EWordTranslations {
    return Object.fromEntries(
        Object.entries(word.translations).map(([key, value]) => [
            key as EWordLanguages,
            getRandomItems<string>(
                [value, ...word.synonyms[key as EWordLanguages]],
                1
            )[0],
        ])
    ) as EWordTranslations;
}