import React, { memo, useCallback } from 'react';
import { useSelector } from "react-redux";

import { dragCardActions, EAnswers, getDragCardState } from "../../model";

import { useAppDispatch } from "@/shared/lib";
import { AppButton } from "@/shared/ui/Button";
import { AppModal } from "@/shared/ui/Modal";
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";


interface IRepeatWordsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReset: () => void;
}

const RepeatWordsModal = memo((props: IRepeatWordsModalProps) => {
    const { isOpen, onClose, onReset } = props;
    
    const dispatch = useAppDispatch();

    const { dragCardWordList, answers } = useSelector(getDragCardState);

    const onTry = useCallback(() => {
        onClose();
        dispatch(
            dragCardActions.setList(
                dragCardWordList.filter(word => answers[EAnswers.NO].includes(word.id))
            )
        );
        dispatch(dragCardActions.reset());
    }, [answers, dispatch, dragCardWordList, onClose]);

    return (
        <AppModal isOpen={isOpen} onClose={onClose}>
            <VStack gap="32">
                <AppText align="center" title="Повторить невыученные слова?" />
                <HStack max justify="between" gap="8">
                    <AppButton size="l" onClick={onReset}>
                        Начать заново
                    </AppButton>
                    <AppButton size="l" onClick={onTry}>
                        Попробовать
                    </AppButton>
                </HStack>
            </VStack>
        </AppModal>
    );
});

RepeatWordsModal.displayName = "RepeatWordsModal";

export default RepeatWordsModal;