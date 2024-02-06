import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

import {
    collectWordActions,
    getCollectWordState
} from "../../model";
import cls from '../CollectWord.module.scss';

import { EWordLanguages } from "@/entities/Word";
import { classNames, isAlpha, shuffleArray } from '@/shared/lib';
import { useAppDispatch } from "@/shared/lib/hooks";
import { AppButton } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";


const Letters = ({ isAnimated }: { isAnimated: boolean }) => {
    const dispatch = useAppDispatch();
    const wordContainerRef = useRef<HTMLDivElement>(null);

    const {
        translatedWord: word,
        selectedLanguage,
        collectedWord
    } = useSelector(getCollectWordState);

    const animateButtons = useCallback(() => {
        const buttons = document.querySelectorAll(`.${cls.wordButton}`);
        const containerRect = wordContainerRef.current?.getBoundingClientRect();

        if (containerRect) {
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;
            const sidebarWidth = 300;

            buttons.forEach((button) => {
                const buttonRect = (button as HTMLElement).getBoundingClientRect();
                const buttonWidth = buttonRect.width;
                const buttonHeight = buttonRect.height;

                const startX = (containerWidth - sidebarWidth) / 2 - buttonWidth / 2;
                const startY = containerHeight / 2 - buttonHeight / 2;

                (button as HTMLElement).style.transform = `translate(${startX}px, ${startY}px)`;

                if (isAnimated) {
                    setTimeout(() => {
                        const maxX = containerWidth - buttonWidth - sidebarWidth;
                        const maxY = containerHeight - buttonHeight;

                        const xPercent = Math.random() * 100;
                        const yPercent = Math.random() * 100;

                        const x = (xPercent / 100) * maxX;
                        const y = (yPercent / 100) * maxY;

                        (button as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
                    }, 1000);
                }
            });
        }
    }, [isAnimated]);

    const handleButtonClick = useCallback((letter: string, idx: number) => {
        dispatch(collectWordActions.add({ id: idx, value: letter, selected: true }));
    }, [dispatch]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const pressedKey = event.key;

        if (pressedKey === 'Backspace') {
            dispatch(collectWordActions.removeLast());
        } else if (word.includes(pressedKey) && isAlpha(pressedKey, selectedLanguage === EWordLanguages.ENGLISH)) {
            handleButtonClick(pressedKey, Object.values(collectedWord).length);
        }
    }, [word, selectedLanguage, dispatch, handleButtonClick, collectedWord]);

    const generateButtons = useCallback(() => {
        return shuffleArray(word.split('').map((letter: string, index: number) => (
            <AppButton
                key={index}
                onClick={(e) => handleButtonClick(letter, index)}
                className={classNames(
                    cls.wordButton,
                    {
                        [cls.selected]: Object.values(collectedWord).some(({ id, value }) =>
                            id.toString() === index.toString() && value === letter
                        ) }
                )}
                size="xl"
            >
                {letter}
            </AppButton>
        )));
    }, [word, handleButtonClick, collectedWord]);

    useEffect(() => {
        animateButtons();

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [animateButtons, handleKeyDown]);

    return (
        <div ref={wordContainerRef} className={cls.wordContainer}>
            <div className={cls.buttonsContainer}>
                <HStack>
                    {generateButtons()}
                </HStack>
            </div>
        </div>
    );
};

export default Letters;
