import { apiSlice } from '@/redux/apiSlice';

import type { IDemoResponse } from '@/types/api/demo';

export const demoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        demo: builder.query<IDemoResponse, void>({
            query: () => '/v1/demo'
        })
    })
});

export const { useDemoQuery } = demoApiSlice;
