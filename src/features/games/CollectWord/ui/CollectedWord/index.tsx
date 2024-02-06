import React, { useMemo } from 'react';
import { useSelector } from "react-redux";

import { getCollectedWord } from "../../model";

import { AppText } from "@/shared/ui/Text";



interface CollectedWordProps {
    className: string;
}

const CollectedWord: React.FC<CollectedWordProps> = ({ className }) => {
    const collectedWord = useSelector(getCollectedWord);

    const formattedCollectedWord = useMemo(() =>
        Object.values(collectedWord).map(({ value }) => value).join(""),
    [collectedWord]
    );

    return (
        <AppText
            className={className}
            title={formattedCollectedWord}
            size="l"
            align="center"
            bold
        />
    );
};

export default CollectedWord;
