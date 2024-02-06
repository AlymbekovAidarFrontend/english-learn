import React, { memo } from "react";

import { AppCard } from "@/shared/ui/Card";
import { VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";

interface SynonymListProps {
    title: string;
    synonyms: string[];
}

const SynonymList = memo(({ title, synonyms }: SynonymListProps) => (
    <VStack max>
        <AppText title={title} />
        <AppCard fullWidth variant="light" padding="24" border="partial">
            {synonyms.map((synonym, index) => (
                <AppText key={index} title={synonym} />
            ))}
        </AppCard>
    </VStack>
));

SynonymList.displayName = "SynonymList";

export default SynonymList;