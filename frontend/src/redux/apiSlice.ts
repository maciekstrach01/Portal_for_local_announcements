import {
    createApi,
    FetchArgs,
    BaseQueryFn,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { StatusCodes as HTTP } from 'http-status-codes';

import config from '@/config';
import { logoutUser, setCredentials } from '@/redux/auth/authSlice';

import type { RootState } from '@/redux';
import { ITokensResponse } from '@/types/api/auth';

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
    let result = await baseQuery(args, store, extraOptions);

    const authState = (store.getState() as RootState).auth;

    if (result?.error?.status === HTTP.UNAUTHORIZED) {
        if (!authState.accessToken || !authState.refreshToken) {
            return result;
        }

        const refreshResult = await baseQuery(
            {
                url: '/v1/auth/refresh-token',
                method: 'POST',
                body: {
                    refreshToken: authState.refreshToken
                }
            },
            store,
            extraOptions
        );

        if (refreshResult.data) {
            const tokenData = refreshResult.data as ITokensResponse;

            store.dispatch(setCredentials(tokenData));

            result = await baseQuery(args, store, extraOptions);
        } else {
            store.dispatch(logoutUser());

            // @TODO Change if possible
            window.location.replace('/login');
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
});
