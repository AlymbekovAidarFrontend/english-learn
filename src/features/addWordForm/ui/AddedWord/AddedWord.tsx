import React, { memo } from 'react';
import { useSelector } from 'react-redux';


import cls from './AddedWord.module.scss';
import { getAddWordSelector } from '../../model';
import SynonymList from '../SynonymList';

import { classNames } from '@/shared/lib';
import { AppCard } from "@/shared/ui/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";


const AddedWord = memo(() => {
    const {
        english,
        russian,
        englishSynonyms,
        russianSynonyms,
        isWithSynonyms,
    } = useSelector(getAddWordSelector);

    return (
        <VStack max gap="32" className={classNames(cls.AddedWord)}>
            {english && russian && (
                <HStack gap="32" max>
                    <AppCard fullWidth variant="light" padding="24" border="partial">
                        {english}
                    </AppCard>
                    <AppText title="=" />
                    <AppCard fullWidth variant="light" padding="24" border="partial">
                        {russian}
                    </AppCard>
                </HStack>
            )}
            {isWithSynonyms && (
                <HStack align="start" max gap="32">
                    {englishSynonyms.length > 0 && (
                        <SynonymList
                            title="Синонимы на английском"
                            synonyms={englishSynonyms}
                        />
                    )}
                    {russianSynonyms.length > 0 && (
                        <SynonymList
                            title="Синонимы на русском"
                            synonyms={russianSynonyms}
                        />
                    )}
                </HStack>
            )}
        </VStack>
    );
});

AddedWord.displayName = "AddedWord";

export default AddedWord;
