import { apiSlice } from '@/redux/apiSlice';

import type {
    ILoginRequest,
    ITokensResponse,
    IRegisterRequest
} from '@/types/api/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation<ITokensResponse, IRegisterRequest>({
            query: payload => ({
                url: '/v1/auth/register',
                method: 'POST',
                body: payload
            })
        }),
        login: builder.mutation<ITokensResponse, ILoginRequest>({
            query: payload => ({
                url: '/v1/auth/authenticate',
                method: 'POST',
                body: payload
            })
        }),
        logout: builder.mutation<void, string>({
            query: payload => ({
                url: '/v1/auth/logout',
                method: 'POST',
                body: {
                    refreshToken: payload
                }
            })
        })
    })
});

export const { useLogoutMutation } = authApiSlice;
