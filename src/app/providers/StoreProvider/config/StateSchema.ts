import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { name as userName, UserSchema } from "@/entities/User";
import { name as wordName, WordSchema  } from "@/entities/Word";
import { name as addWordFormName, AddWordFormSchema } from "@/features/addWordForm";
import { name as authName, AuthSchema } from "@/features/authForm";
import { name as collectWordName, ICollectWordSchema } from "@/features/games/CollectWord";
import { name as comparisonName, IComparisonSchema } from "@/features/games/Comparison";
import { name as dragCardName, IDragCardSchema } from "@/features/games/DragCard";
import { rtkApi } from "@/shared/api/rtkApi";

export interface StateSchema {
    [userName]: UserSchema;
    [wordName]: WordSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // async
    [comparisonName]?: IComparisonSchema;
    [collectWordName]?: ICollectWordSchema;
    [dragCardName]?: IDragCardSchema
    [addWordFormName]?: AddWordFormSchema;
    [authName]?: AuthSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => void;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}