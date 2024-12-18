import { apiSlice } from '@/redux/apiSlice';

import { ICategory } from '@/types/api/category';

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        index: builder.query<ICategory[], void>({
            query: () => ({
                url: '/v1/category'
            })
        })
    })
});

export const { useIndexQuery } = categoryApiSlice;
