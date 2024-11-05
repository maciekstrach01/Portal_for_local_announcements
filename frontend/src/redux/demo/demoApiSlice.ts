import { apiSlice } from '@/redux/apiSlice';

export const demoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        demo: builder.query({
            query: () => ({
                url: '/v1/demo',
                method: 'GET'
            })
        })
    })
});
