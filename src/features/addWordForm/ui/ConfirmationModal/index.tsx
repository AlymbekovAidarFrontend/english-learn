import React, { memo } from 'react';

import { AppButton } from "@/shared/ui/Button";
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";

interface IConfirmationModalProps { 
    title: string; 
    text?: string; 
    onCancel: () => void; 
    onConfirm: () => void
}

const ConfirmationModal = memo(({
    title,
    text = "",
    onCancel,
    onConfirm,
}: IConfirmationModalProps) => (
    <VStack gap="32">
        <AppText title={title} text={text} />
        <HStack max justify="between">
            <AppButton size="l" onClick={onCancel}>
                Отменить
            </AppButton>
            <AppButton size="l" onClick={onConfirm}>
                Подтвердить
            </AppButton>
        </HStack>
    </VStack>
));

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;