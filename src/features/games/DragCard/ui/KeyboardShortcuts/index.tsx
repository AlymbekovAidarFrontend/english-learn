import React, { memo } from 'react';

import cls from '../DragCard/DragCard.module.scss';

import { VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";



const KeyboardShortcuts = memo(() => (
    <VStack gap="8" className={cls.keyboardShortcuts}>
        <AppText title="Сочетания клавиш:" size="m" />
        <AppText title="НЕТ: Левый SHIFT + левая стрелка" size="s" />
        <AppText title="ДА: Левый SHIFT + правая стрелка" size="s" />
    </VStack>
));

KeyboardShortcuts.displayName = "KeyboardShortcuts";

export default KeyboardShortcuts;