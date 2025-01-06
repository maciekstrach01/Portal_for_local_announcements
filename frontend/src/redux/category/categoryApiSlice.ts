import { apiSlice } from '@/redux/apiSlice';

import type { ICategory } from '@/types/api/category';

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => ({
                url: '/v1/category'
            }),
            providesTags: ['Category']
        })
    }),
    overrideExisting: 'throw'
});
