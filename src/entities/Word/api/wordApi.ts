import { Word } from '../model/types/word';

import { rtkApi } from "@/shared/api/rtkApi";


export const wordApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getWordData: build.query<Word[], undefined>({
            query: () => ({
                url: `/words`,
                method: 'GET'
            }),
        }),
    }),
});

export const getWordDataByIdQuery = wordApi.endpoints.getWordData.initiate;
