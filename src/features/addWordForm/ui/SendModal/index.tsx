import React, { memo } from 'react';

import ConfirmationModal from '../ConfirmationModal';

import { AppModal } from "@/shared/ui/Modal";


interface ISendModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: () => void
}

const SendModal = memo(({ isOpen, onClose, onSend }: ISendModalProps) => (
    <AppModal isOpen={isOpen} onClose={onClose}>
        <ConfirmationModal
            title="Уверены что вписали все данные корректно?"
            onCancel={onClose}
            onConfirm={() => {
                onSend();
                onClose();
            }}
        />
    </AppModal>
));

SendModal.displayName = "SendModal";

export default SendModal;