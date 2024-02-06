import React, { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { CgArrowLeftR, CgArrowRightR } from "react-icons/cg";
import { useSelector } from "react-redux";


import {
    EAnswers,
    getDragCardState
} from "../../model";
import cls from '../DragCard/DragCard.module.scss';

import { EWordLanguages } from '@/entities/Word';
import { classNames } from '@/shared/lib';
import { AppIcon } from "@/shared/ui/Icon";
import { HStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";


interface ICardProps {
    onAnswerClick: (answer: EAnswers) => () => void;
    setIsTranslated: Dispatch<SetStateAction<boolean>>;
    isTranslated: boolean;
    isAnimatingRight: boolean;
    isAnimatingLeft: boolean;
}

const Card = memo(({ onAnswerClick, setIsTranslated, isTranslated, isAnimatingRight, isAnimatingLeft }: ICardProps) => {
    const { answers, word, selectedLanguage } = useSelector(getDragCardState);

    const onTranslate = useCallback(() => {
        setIsTranslated(prev => !prev);
    }, [setIsTranslated]);

    if (!word) return null;

    return (
        <HStack gap="32">
                <div
                    className={classNames(cls.icon, {}, [cls.iconLeft])}
                >
                    <AppText
                        variant="accent"
                        size="s"
                        title="Нет"
                    />
                    <AppIcon
                        width={50}
                        height={50}
                        size={50}
                        Svg={CgArrowLeftR}
                        clickable
                        onClick={onAnswerClick(EAnswers.NO)}
                    />
                </div>

                <AppText
                    bold
                    size="l"
                    title={answers[EAnswers.NO].length.toString()}
                />

                <div
                    onClick={onTranslate}
                    className={classNames(cls.cardWrapper, { [cls.translated]: isTranslated })}
                >
                    <div className={
                        classNames(
                            cls.card,
                            {
                                [cls.animateOutLeft]: isTranslated ? isAnimatingRight : isAnimatingLeft,
                                [cls.animateOutRight]: isTranslated ? isAnimatingLeft : isAnimatingRight
                            }
                        )}
                    >
                        <AppText
                            className={classNames(cls.word, { [cls.translated]: isTranslated })}
                            title={
                                isTranslated
                                    ? word.translations[selectedLanguage]
                                    : word.translations[selectedLanguage === EWordLanguages.ENGLISH
                                        ? EWordLanguages.RUSSIAN
                                        : EWordLanguages.ENGLISH
                                    ]
                            }
                        />
                    </div>
                </div>

                <AppText
                    bold
                    size="l"
                    title={answers[EAnswers.YES].length.toString()}
                />

                <div
                    className={classNames(cls.icon, {}, [cls.iconRight])}
                >
                    <AppText
                        variant="accent"
                        size="s"
                        title="Да"
                    />
                    <AppIcon
                        width={50}
                        height={50}
                        size={50}
                        Svg={CgArrowRightR}
                        clickable
                        onClick={onAnswerClick(EAnswers.YES)}
                    />
                </div>
            </HStack>
    );
});

Card.displayName = "Card";

export default Card;