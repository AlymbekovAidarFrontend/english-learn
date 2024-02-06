import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from "react-redux";

import cls from './Comparison.module.scss';
import LanguageCol from './LanguageCol';
import {
    comparisonActions,
    getComparisonState,
    name as comparisonReducerName,
    comparisonReducer
} from "../model";

import { Word, getWordList, EWordLanguages, getWordListIsLoading } from '@/entities/Word';
import { getRandomItems, useAppDispatch, classNames } from "@/shared/lib";
import { DynamicModuleLoader } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { AppButton } from "@/shared/ui/Button";
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";
import { PageLoader } from '@/widgets';


const reducers = {
    [comparisonReducerName]: comparisonReducer
};

export const Comparison = () => {
    const dispatch = useAppDispatch();
    const wordList = useSelector(getWordList)();
    const wordListIsLoading = useSelector(getWordListIsLoading);
    
    const {
        comparisonList,
        selectedComparisonIds,
        completedWordIds
    } = useSelector(getComparisonState);
    
    const comparisonWordLength = useMemo(
        () => Math.min(wordList.length, 5),
        [wordList.length]
    );

    const updateWords = useCallback(() => {
        dispatch(comparisonActions.set(getRandomItems<Word>([...wordList], comparisonWordLength)));
    }, [dispatch, comparisonWordLength, wordList]);

    useEffect(() => {dispatch(comparisonActions.check());}, [dispatch, selectedComparisonIds]);

    useEffect(() => {
        if (wordList.length && !comparisonList.length) {
            updateWords();
        }
    }, [
        comparisonList.length, 
        updateWords, 
        wordList.length
    ]);

    useEffect(() => {
        if (completedWordIds.length === comparisonWordLength && wordList.length) {
            dispatch(comparisonActions.completed());
            updateWords();
        }
    }, [completedWordIds.length, comparisonWordLength, dispatch, updateWords, wordList.length]);
    
    if (wordListIsLoading) return <PageLoader />;

    if (!wordList.length) return <AppText title="Ваш список слов пуст" align="center" />;

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.Comparison)}>
                <VStack gap="32">
                    <h2 className={cls.title}>Выберите переводы с колонок</h2>
                    <HStack align='center' justify="center" gap="32">
                        {[EWordLanguages.RUSSIAN, EWordLanguages.ENGLISH].map((language) => (
                            <LanguageCol
                                key={language}
                                language={language}
                            />
                        ))}
                    </HStack>
                    <AppButton
                        variant="filled"
                        onClick={updateWords}
                    >
                        Перезагрузить
                    </AppButton>
                </VStack>
            </div>
        </DynamicModuleLoader>
    );
};
