import React, { memo, useMemo } from 'react';
import { RiMore2Fill } from 'react-icons/ri';

import { getDropdownItems } from "../../model";

import { AppCard } from '@/shared/ui/Card';
import { AppDropdown } from '@/shared/ui/Popups';
import { HStack } from '@/shared/ui/Stack';
import { AppText } from '@/shared/ui/Text';


interface WordListItemProps {
    english: string;
    russian: string;
    id: number;
    onSelect: (id: Nullable<number>) => void;
    onRemove: () => void;
}

const WordListItem = memo((props: WordListItemProps) => {

    const { english, russian, id, onSelect, onRemove } = props;
    
    const items = useMemo(() => getDropdownItems({ onSelect, id }), [id, onSelect]);

    return (
        <li>
            <HStack gap="32">
                <AppCard fullWidth variant="light" padding="24" border="partial">
                    {english}
                </AppCard>
                <AppText title="=" />
                <AppCard fullWidth variant="light" padding="24" border="partial">
                    {russian}
                </AppCard>
                <HStack gap="8">
                    <AppDropdown
                        direction="bottom left"
                        items={items}
                        trigger={<RiMore2Fill onClick={onRemove} color="white" size={30}/>}
                    />
                </HStack>
            </HStack>
        </li>
    );
});

WordListItem.displayName = "WordListItem";

export default WordListItem;
