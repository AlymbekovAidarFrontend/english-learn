import React, { memo, useCallback } from 'react';
import { useSelector } from "react-redux";

import { dragCardActions, getDragCardSelectedLanguage } from "../../model";

import { EWordLanguages } from "@/entities/Word";
import { useAppDispatch } from "@/shared/lib";
import { AppButton } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";


interface IHeaderProps {
    onReset: () => void;
}
const Header = memo((props: IHeaderProps) => {
    const { onReset } = props;
    const dispatch = useAppDispatch();

    const selectedLanguage = useSelector(getDragCardSelectedLanguage);

    const handleToggleLang = useCallback(() => {
        dispatch(dragCardActions.toggleLang());
    }, [dispatch]);

    return (
        <HStack justify="end" gap="16">
            <AppButton
                onClick={onReset}
            >
                Начать заново
            </AppButton>
            <AppButton onClick={handleToggleLang}>
                {
                    selectedLanguage === EWordLanguages.RUSSIAN
                        ? 'На русском'
                        : 'In English'
                }
            </AppButton>
        </HStack>
    );
});

Header.displayName = "DragCardHeader";

export default Header;