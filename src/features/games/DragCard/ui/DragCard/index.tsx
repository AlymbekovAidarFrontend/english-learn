import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';


import cls from './DragCard.module.scss';
import {
    dragCardActions,
    dragCardReducer,
    EAnswers,
    getDragCardState,
    name as dragCardReducerName
} from '../../model';
import Card from '../Card';
import Header from "../Header";
import KeyboardShortcuts from '../KeyboardShortcuts';
import RepeatWordsModal from '../RepeatWordsModal';

import { getWordList, getWordListIsLoading } from '@/entities/Word';
import { classNames, useAppDispatch } from '@/shared/lib';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";
import { PageLoader } from '@/widgets';



const animationDelay = 400;

const reducers = {
    [dragCardReducerName]: dragCardReducer
};

const DragCard = () => {
    const dispatch = useAppDispatch();
    const wordList = useSelector(getWordList)();
    const wordListIsLoading = useSelector(getWordListIsLoading);

    const {
        dragCardWordList,
        word,
        answers,
        answersCount
    } = useSelector(getDragCardState);

    const [isLeftShiftPressed, setIsLeftShiftPressed] = useState(false);
    const [isAnimatingRight, setIsAnimatingRight] = useState(false);
    const [isAnimatingLeft, setIsAnimatingLeft] = useState(false);
    const [isTranslated, setIsTranslated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const answerDisabled = isAnimatingRight || isAnimatingLeft;
    const updateWord = useCallback(() => dispatch(dragCardActions.set(dragCardWordList)), [dispatch, dragCardWordList]);

    const setDragCardWord = useCallback(() => {
        if (dragCardWordList.length && !word) {
            updateWord();
        }
    }, [word, updateWord, dragCardWordList.length]);

    const onAnswerClick = useCallback(
        (answer: EAnswers) => () => {
            if (answerDisabled) return;

            const setIsAnimating = answer === EAnswers.YES ? setIsAnimatingRight : setIsAnimatingLeft;

            setIsAnimating(true);

            setTimeout(() => {
                setIsAnimating(false);
                dispatch(dragCardActions.setAnswer(answer));
                updateWord();
                setIsTranslated(false);
            }, animationDelay);
        },
        [answerDisabled, dispatch, updateWord, setIsAnimatingRight, setIsAnimatingLeft]
    );

    const onReset = useCallback(() => {
        dispatch(dragCardActions.reset());
        dispatch(dragCardActions.setList(wordList));
    }, [dispatch, wordList]);

    const onCloseModal = useCallback(() => setIsOpen(false), []);

    const wordListCount = useMemo(() => dragCardWordList.length, [dragCardWordList]);

    useEffect(() => {
        console.log(123);
        setDragCardWord();
    }, [setDragCardWord]);

    useEffect(() => {
        if (!dragCardWordList.length) {
            dispatch(dragCardActions.setList(wordList));
        }
    }, [dispatch, dragCardWordList.length, wordList]);

    useEffect(() => {
        const isWordListNotEmpty = !!dragCardWordList.length;
        const isLearningComplete = answersCount === dragCardWordList.length;

        if (isWordListNotEmpty && isLearningComplete) {
            const areUnlearnedWords = !!answers[EAnswers.NO].length;

            if (areUnlearnedWords) {
                setIsOpen(true);
            } else {
                onReset();
            }
        }
    }, [answers, answersCount, onReset, dragCardWordList]);

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'Shift' && event.location === 1) {
                setIsLeftShiftPressed(false);
            }
        };

        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Shift' && event.location === 1) {
                setIsLeftShiftPressed(true);
            }
            if (isLeftShiftPressed) {
                if (event.key === 'ArrowLeft') onAnswerClick(EAnswers.NO)();
                if (event.key === 'ArrowRight') onAnswerClick(EAnswers.YES)();
            }
        };

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isLeftShiftPressed, onAnswerClick]);

    if (wordListIsLoading) return <PageLoader />;

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Header onReset={onReset} />
            <div className={classNames(cls.DragCard)}>
                <VStack>
                    <AppText className={cls.title} align="center" size="l" title="Вы знали перевод этого слова?" />
                    <AppText className={cls.title} align="center" size="l" title={`${answersCount}/${wordListCount}`} />
                    <Card
                        onAnswerClick={onAnswerClick}
                        setIsTranslated={setIsTranslated}
                        isTranslated={isTranslated}
                        isAnimatingRight={isAnimatingRight}
                        isAnimatingLeft={isAnimatingLeft}
                    />
                </VStack>
            </div>
            {isOpen && <RepeatWordsModal isOpen={isOpen} onClose={onCloseModal} onReset={onReset} />}
            <KeyboardShortcuts />
        </DynamicModuleLoader>
    );
};

export default DragCard;
