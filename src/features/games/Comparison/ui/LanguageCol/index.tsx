import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';


import {
    comparisonActions,
    getComparisonCorrectWordIds,
    getComparisonSelectedWordIds,
    getComparisonWordList
} from "../../model";
import cls from '../Comparison.module.scss';

import { EWordLanguages, Word } from '@/entities/Word';
import { classNames, shuffleArray } from '@/shared/lib';
import { useAppDispatch } from "@/shared/lib/hooks";
import { AppButton } from '@/shared/ui/Button';


interface LanguageColProps {
    language: EWordLanguages;
}

const LanguageCol = memo(({ language }: LanguageColProps) => {
    const dispatch = useAppDispatch();

    const list = useSelector(getComparisonWordList);
    const selectedIds = useSelector(getComparisonSelectedWordIds);
    const completedWordIds = useSelector(getComparisonCorrectWordIds);

    const shuffledList = useMemo(() => shuffleArray<Word>(list), [list]);

    return (
        <div className={classNames(cls.LanguageCol)}>
            <ul>
                {shuffledList.map(({ translations, synonyms, id }) => (
                    <AppButton
                        className={completedWordIds.includes(id) ? cls.completed : ''}
                        selected={selectedIds[language] === id}
                        onClick={() => dispatch(comparisonActions.select({ id, language }))}
                        size="xl"
                        key={translations[language]}
                    >
                        {translations[language]}
                    </AppButton>
                ))}
            </ul>
        </div>
    );
});

LanguageCol.displayName = 'LanguageCol';

export default LanguageCol;
