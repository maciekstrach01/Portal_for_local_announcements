import {
    createApi,
    FetchArgs,
    BaseQueryFn,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { StatusCodes as HTTP } from 'http-status-codes';

import {
    logoutUser,
    setCredentials,
    adjustUsedToken
} from '@/redux/auth/authSlice';
import config from '@/config';

import type { RootState } from '@/redux';

const baseQuery = fetchBaseQuery({
    baseUrl: config.apiUrl,
    prepareHeaders: (headers, { getState }) => {
        const usedToken = (getState() as RootState).auth.usedToken;

        if (usedToken) {
            headers.set('Authorization', `Bearer ${usedToken}`);
        }

        return headers;
    }
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, store, extraOptions) => {
    console.log('baseQueryWithReauth');

    let result = await baseQuery(args, store, extraOptions);

    const authState = (store.getState() as RootState).auth;

    if (result?.error?.status === HTTP.UNAUTHORIZED) {
        console.log('Reauth');

        if (!authState.accessToken || !authState.refreshToken) {
            return result;
        }

        console.log('Do reauth');

        store.dispatch(adjustUsedToken(authState.refreshToken));

        console.log({ extraOptions });

        // @TODO SET POST METHOD!
        // @TODO What about extraOptions?
        const refreshResult = await baseQuery(
            {
                url: '/v1/auth/refresh-token',
                method: 'POST'
            },
            store,
            extraOptions
        );

        console.log({ refreshResult });

        if (refreshResult?.data) {
            store.dispatch(setCredentials(refreshResult.data));

            result = await baseQuery(args, store, extraOptions);
        } else {
            store.dispatch(logoutUser());

            // @TODO Redirect to login
        }
    }

    return result;
};

// @TODO What about builder?
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});
