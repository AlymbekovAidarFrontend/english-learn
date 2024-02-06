import React, { memo } from 'react';

import ConfirmationModal from '../ConfirmationModal';

import { AppModal } from "@/shared/ui/Modal";


interface IClearModalProps { 
    isOpen: boolean; 
    onClose: () => void; 
    onClear: () => void 
}

const ClearModal =
    memo(({ isOpen, onClose, onClear }: IClearModalProps) => (
        <AppModal isOpen={isOpen} onClose={onClose}>
            <ConfirmationModal
                title="Вы уверены что хотите очистить форму?"
                text="Будут очищены поля для ввода и введенные (если есть) синонимы!"
                onCancel={onClose}
                onConfirm={() => {
                    onClear();
                    onClose();
                }}
            />
        </AppModal>
    ));

ClearModal.displayName = "ClearModal";

export default ClearModal;