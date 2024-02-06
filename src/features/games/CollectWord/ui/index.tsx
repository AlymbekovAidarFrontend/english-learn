import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CollectedWord from './CollectedWord';
import cls from './CollectWord.module.scss';
import Header from './Header';
import Letters from './Letters';
import { collectWordActions, getCollectWordState } from '../model';

import { getWordList, getWordListIsLoading } from '@/entities/Word';
import { LOCAL_STORAGE_COLLECT_WORD_IS_ANIMATED } from '@/shared/const';
import { useAppDispatch } from '@/shared/lib';
import { AppText } from '@/shared/ui/Text';
import { PageLoader } from '@/widgets';

export const CollectWord = () => {
    const dispatch = useAppDispatch();
    const wordList = useSelector(getWordList)();
    const wordListIsLoading = useSelector(getWordListIsLoading);

    const { word, collectedWord, selectedLanguage } = useSelector(getCollectWordState);

    const [localIsAnimated, setLocalIsAnimated] =
        useState<Nullable<string>>(localStorage.getItem(LOCAL_STORAGE_COLLECT_WORD_IS_ANIMATED));

    const toggleIsAnimated = useCallback(() => {
        const newIsAnimated = localIsAnimated ? "" : "isAnimated";
        localStorage.setItem(LOCAL_STORAGE_COLLECT_WORD_IS_ANIMATED, newIsAnimated);
        setLocalIsAnimated(newIsAnimated);
    }, [localIsAnimated]);

    const updateWord = useCallback(() => dispatch(collectWordActions.set(wordList)), [dispatch, wordList]);

    const setCollectWord = useCallback(() => {
        if (wordList.length && !word) {
            updateWord();
        }
    }, [word, updateWord, wordList.length]);

    useEffect(() => setCollectWord(), [setCollectWord]);

    useEffect(() => {
        if (word && word[selectedLanguage].length === Object.keys(collectedWord).length) {
            const collectedWordValues = Object.values(collectedWord) as { value: any }[];
            const collectedWordValue = collectedWordValues.map(({ value }) => value).join("");
            if (collectedWordValue === word[selectedLanguage]) {
                dispatch(collectWordActions.completed());
                updateWord();
            }
        }
    }, [collectedWord, dispatch, selectedLanguage, updateWord, word]);


    if (wordListIsLoading) return <PageLoader />;

    if (!wordList?.length) {
        return <AppText align="center" title="Ваш список слов пуст" />;
    }

    if (!word) {
        return null;
    }

    return (
        <>
            <Header
                isAnimated={!!localIsAnimated}
                toggleIsAnimated={toggleIsAnimated}
                updateWord={updateWord}
                className={cls.title}
            />
            <CollectedWord className={cls.collectedWordContainer} />
            <Letters isAnimated={!!localIsAnimated} />
        </>
    );
};
