import React, { useCallback, useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

import cls from './AddWordForm.module.scss';
import {
    getAddWordSelector,
    addWordFormActions,
    addNewWord,
    addWordFormValidationSchema,
    IAddNewWord,
    EWordSynonyms,
    name as addWordFormReducerName,
    addWordFormReducer
} from '../../model';
import ClearModal from '../ClearModal';
import SendModal from '../SendModal';
import SynonymsForm from "../SynonymsForm";

import { EWordLanguages, wordApi } from '@/entities/Word';
import { isAlpha } from '@/shared/lib';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks';
import { AppButton } from "@/shared/ui/Button";
import { AppCard } from "@/shared/ui/Card";
import { AppInput } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";


const reducers = {
    [addWordFormReducerName]: addWordFormReducer
};

const AddWordForm = memo(() => {
    const dispatch = useAppDispatch();
    const [sendModalOpen, setSendModalOpen] = useState<boolean>(false);
    const [isClearModalOpen, setIsClearModalOpen] = useState<boolean>(false);

    const {
        russian,
        english,
        russianSynonyms,
        englishSynonyms,
        isWithSynonyms,
    } = useSelector(getAddWordSelector);

    const handleTextChange = useCallback((value: string, key: keyof IAddNewWord, isEnglish: boolean = false): void => {
        if (!value || (value && isAlpha(value[value.length - 1], isEnglish))) {
            dispatch(addWordFormActions.setText({ key, value }));
        }
    }, [dispatch]);

    const handleToggleIsWithSynonyms = useCallback(() => {
        dispatch(addWordFormActions.toggleIsWithSynonyms());
    }, [dispatch]);

    const handleClearForm = useCallback(() => {
        dispatch(addWordFormActions.clear());
    }, [dispatch]);

    const handleCloseModal = useCallback(() => {
        setIsClearModalOpen(false);
        setSendModalOpen(false);
    }, []);

    const handleSend = async (): Promise<void> => {
        await addWordFormValidationSchema.validate({ russian, english }, { abortEarly: false });
        const wordData: IAddNewWord = {
            [EWordLanguages.ENGLISH]: english,
            [EWordLanguages.RUSSIAN]: russian,
            [EWordSynonyms.ENGLISH]: englishSynonyms,
            [EWordSynonyms.RUSSIAN]: russianSynonyms,
        };

        const result = await dispatch(addNewWord(wordData));

        if (result.meta.requestStatus === 'fulfilled') {
            handleClearForm();
            dispatch(wordApi.util.resetApiState());
        }
    };

    const onConfirm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSendModalOpen(true);
    }, []);

    const sendDisabled = useMemo(() => !english.trim().length || !russian.trim().length, [english, russian]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <AppCard padding="24" border="partial" fullWidth>
                <form onSubmit={onConfirm}>
                    <VStack max gap="32">
                        <HStack max gap="16" align="end">
                            <AppInput
                                label="Введите новое выученное слово на английском языке"
                                className={cls.input}
                                placeholder="In English"
                                value={english}
                                onChange={value => handleTextChange(value, EWordLanguages.ENGLISH, true)}
                            />
                            <AppInput
                                label="Введите его перевод на русский язык"
                                className={cls.input}
                                placeholder="На русском"
                                value={russian}
                                onChange={value => handleTextChange(value, EWordLanguages.RUSSIAN)}
                                disabled={!english.trim().length}
                            />
                            <AppButton
                                type="button"
                                onClick={() => setIsClearModalOpen(true)}
                                disabled={sendDisabled}
                                noWrap
                            >
                                Очистить форму
                            </AppButton>
                        </HStack>

                        <HStack max justify="between">
                            <AppButton onClick={handleToggleIsWithSynonyms}>
                                {isWithSynonyms ? 'Без синонимов' : 'Добавить синонимы'}
                            </AppButton>
                            <AppButton type="submit" disabled={sendDisabled}>
                                <AppText variant="accent" size="m" title="Отправить" />
                            </AppButton>
                        </HStack>

                        {isWithSynonyms && (
                            <SynonymsForm
                                handleTextChange={handleTextChange}
                                sendDisabled={sendDisabled}
                            />
                        )}
                    </VStack>
                </form>
                {isClearModalOpen && (
                    <ClearModal
                        isOpen={isClearModalOpen}
                        onClose={handleCloseModal}
                        onClear={handleClearForm}
                    />
                )}
                {sendModalOpen && (
                    <SendModal
                        isOpen={sendModalOpen}
                        onClose={handleCloseModal}
                        onSend={handleSend}
                    />
                )}
            </AppCard>
        </DynamicModuleLoader>
    );
});

AddWordForm.displayName = "AddWordForm";

export default AddWordForm;
