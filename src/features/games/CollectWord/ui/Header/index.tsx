import React from 'react';
import { useSelector } from "react-redux";

import { collectWordActions, getCollectedWordSelectedLanguage, getCollectWord } from "../../model";

import { EWordLanguages } from "@/entities/Word";
import { useAppDispatch } from "@/shared/lib/hooks";
import { AppButton } from "@/shared/ui/Button";
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";


interface HeaderProps {
    className: string;
    updateWord: () => void;
    toggleIsAnimated: () => void;
    isAnimated: boolean;
}

const Header: React.FC<HeaderProps> = ({ className, updateWord, isAnimated, toggleIsAnimated }) => {
    const dispatch = useAppDispatch();
    const word = useSelector(getCollectWord);
    const selectedLanguage = useSelector(getCollectedWordSelectedLanguage);

    const handleToggleLang = () => {
        dispatch(collectWordActions.toggleLang());
    };

    return (
        <HStack justify="between">
            <VStack gap="8">
                <AppButton onClick={updateWord}>Другое слово</AppButton>
                <AppButton onClick={toggleIsAnimated}>
                    {isAnimated ? "Отключить анимацию" : "Включить анимацию"}
                </AppButton>
            </VStack>
            <AppText
                className={className}
                title={word
                    ? word[selectedLanguage === EWordLanguages.ENGLISH
                        ? EWordLanguages.RUSSIAN
                        : EWordLanguages.ENGLISH]
                    : ""}
                size="l"
                align="center"
                bold
            />
            <AppButton onClick={handleToggleLang}>
                {selectedLanguage === EWordLanguages.RUSSIAN ? "На русском" : "In English"}
            </AppButton>
        </HStack>
    );
};

export default Header;
