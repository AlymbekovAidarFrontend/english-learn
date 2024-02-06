import React, { memo } from 'react';

import { AppButton } from '@/shared/ui/Button';
import { AppModal } from '@/shared/ui/Modal';
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppText } from '@/shared/ui/Text';


interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationModal = memo((props: DeleteConfirmationModalProps) => {
    
    const { isOpen, onClose, onConfirm } = props;
    
    return (
        <AppModal isOpen={isOpen} onClose={onClose} lazy>
            <VStack gap="32">
                <AppText title="Вы уверены что хотите удалить это слово?" />
                <HStack max justify="between">
                    <AppButton size="l" onClick={onClose}>
                        Отменить
                    </AppButton>
                    <AppButton size="l" onClick={onConfirm}>
                        Удалить
                    </AppButton>
                </HStack>
            </VStack>
        </AppModal>
    );
});

DeleteConfirmationModal.displayName = "DeleteConfirmationModal";

export default DeleteConfirmationModal;
