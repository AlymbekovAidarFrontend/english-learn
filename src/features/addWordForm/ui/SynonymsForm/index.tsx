import React, { memo, useCallback } from 'react';
import { useSelector } from "react-redux";

import { addWordFormActions, EWordSynonyms, getAddWordSelector, IAddNewWord } from "../../model";
import cls from "../AddWordForm/AddWordForm.module.scss";

import { EWordLanguages } from "@/entities/Word";
import { useAppDispatch } from "@/shared/lib";
import { AppButton } from "@/shared/ui/Button";
import { AppInput } from "@/shared/ui/Input";
import { HStack } from "@/shared/ui/Stack";


interface ISynonymsFormProps {
    handleTextChange: (value: string, key: keyof IAddNewWord, isEnglish?: boolean) => void;
    sendDisabled: boolean;
}

const SynonymsForm = memo((props: ISynonymsFormProps) => {
    const dispatch = useAppDispatch();

    const {
        handleTextChange,
        sendDisabled
    } = props;

    const {
        russian,
        english,
        russianSynonym,
        englishSynonym,
    } = useSelector(getAddWordSelector);

    const handleAddSynonym = useCallback((key: EWordLanguages) => (): void => {
        dispatch(addWordFormActions.addSynonym(key));
    }, [dispatch]);

    return (
        <>
            <HStack className={cls.synonyms} align="end" gap="16">
                <AppInput
                    type="text"
                    label={`Введите синоним ${english} на английском`}
                    className={cls.input}
                    value={englishSynonym}
                    onChange={value => handleTextChange(value, EWordSynonyms.ENGLISH, true)}
                    disabled={sendDisabled}
                />
                <AppButton
                    type="button"
                    size="m"
                    disabled={sendDisabled}
                    onClick={handleAddSynonym(EWordLanguages.ENGLISH)}
                >
                    Добавить
                </AppButton>
            </HStack>
            <HStack className={cls.synonyms} align="end" gap="16">
                <AppInput
                    type="text"
                    label={`Введите синоним ${russian} на русском`}
                    className={cls.input}
                    value={russianSynonym}
                    onChange={value => handleTextChange(value, EWordSynonyms.RUSSIAN)}
                    disabled={sendDisabled}
                />
                <AppButton
                    type="button"
                    size="m"
                    disabled={sendDisabled}
                    onClick={handleAddSynonym(EWordLanguages.RUSSIAN)}
                >
                    Добавить
                </AppButton>
            </HStack>
        </>
    );
});

SynonymsForm.displayName = "SynonymsForm";

export default SynonymsForm;