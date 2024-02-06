import React, { useCallback, useState } from 'react';
import { BsDoorOpen } from "react-icons/bs";


import cls from './LogoutConfirmForm.module.scss';

import { userActions } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib";
import { AppButton } from "@/shared/ui/Button";
import { AppIcon } from '@/shared/ui/Icon';
import { AppModal } from "@/shared/ui/Modal";
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";


const LogoutConfirmForm = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setOpen] = useState(false);

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <div>
            <AppIcon
                clickable
                // eslint-disable-next-line react/jsx-no-bind
                onClick={setOpen.bind(null, true)}
                Svg={BsDoorOpen}
                className={cls.icon}
            />
            {isOpen && (
                <AppModal isOpen={isOpen} onClose={onClose} lazy>
                    <VStack gap="32">
                        <AppText title="Вы уверены, что хотите выйти?" />
                        <HStack max justify="between">
                            <AppButton size="l" onClick={onClose}>
                                Отменить
                            </AppButton>
                            <AppButton size="l" onClick={() => dispatch(userActions.logout())}>
                                Выйти
                            </AppButton>
                        </HStack>
                    </VStack>
                </AppModal>
            )}
        </div>
    );
};

export default LogoutConfirmForm;
