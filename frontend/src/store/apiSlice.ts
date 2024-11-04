import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import config from '@/config';
import type { RootState } from '@/store';

const baseQuery = fetchBaseQuery({
    baseUrl: config.apiUrl,
    credentials: 'include',
    // prepareHeaders: (headers, { getState }) => {
    //     const token = (getState() as RootState).auth.token;
    //
    //     if (token) {
    //         headers.set('Authorization', `Bearer ${token}`);
    //     }
    //
    //     return headers;
    // }
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);
//
//     if (result?.error?.originalStatus === HTTP.UNAUTHORIZED) {
//         // Logout
//
//         // Redirect to login
//         api.dispatch()
//         console.log('sending refresh token');
//
//         // Send refresh token
//
//         const refreshResult = await baseQuery()
//     }
// };
