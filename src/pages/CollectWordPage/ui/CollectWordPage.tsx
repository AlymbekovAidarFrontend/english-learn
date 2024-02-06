import React from 'react';

import { CollectWord } from '@/features/games/CollectWord';
import { collectWordReducer, name as collectWordReducerName } from "@/features/games/CollectWord/model";
import { DynamicModuleLoader } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const reducers = {
    [collectWordReducerName]: collectWordReducer
};
export default () => {
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <CollectWord />
        </DynamicModuleLoader>
    );
};